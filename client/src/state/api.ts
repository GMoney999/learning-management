import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";

// Create a baseQuery using fetchBaseQuery from Redux Toolkit. 
const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  // configure with a baseUrl taken from an environment variable
  // typically set to backend server's URL
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  // Attempt to execute base query
  try {
    const result: any = await baseQuery(args, api, extraOptions);
    
    // If it works (result.data exists), extract nested field "data"
    // Useful for not having to write courses.data or course.data every time
    if (result.data) {
      result.data = result.data.data;
    }

    return result;

    // If it fails (result.error exists), return the error
    // Useful for not having to write courses.error or course.error every time
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", data: errorMessage } };
  }
}

//// API CONFIGURATION
// baseQuery:
//    used as the base query for all endpoints defined in the createApi instance. 
//    This means every request made through this API will use the logic defined in customBaseQuery 
//    for making HTTP requests and handling responses or errors.
//
// reducerPath:
//    a string that specifies the key in the Redux store where the API slice's state will be stored, 
//    like a namespace for the API data in your Redux state.
// 
// tagTypes:
//    array of strings that defines the type of tags that can be used for caching and invalidation.
//    Tags help manage cache updates when data changes, which allows ui to reflect the latest data.
//
// endpoints:
//    defines api operations we want to perform.
//    Each endpoint specifies how to construct the request (url, parameters)
export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses"],
  // 'build' arg is an object that provides methods for defining api endpoints,
  // which allows us to define queries and mutations for api
  endpoints: (build) => ({
    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),
    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),
  }), 
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
} = api;