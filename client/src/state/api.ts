import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Course from "../types/index";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Courses"],
  endpoints: (build) => ({
    getCourse: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),
    getCourses: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),
  }), 
});

export const {
  useGetCourseQuery,
  useGetCoursesQuery,
} = api;