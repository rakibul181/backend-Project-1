import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/students/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester'
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { CoursesRoutes } from '../modules/Course/course.routs'

const router = Router()

const modulesRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CoursesRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
]

modulesRoutes.forEach((route) => router.use(route.path, route.route))

export default router
