import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LayoutComponent } from "./layout/layout.component";
import { AddCoursePageComponent } from "./pages/add-course-page/add-course.component";
import { AddBlogPageComponent } from "./pages/add-blog-page/add-blog.component";
import { AddSectionPageComponent } from "./pages/add-section-page/add-section.component";
import { AddCategoryPageComponent } from "./pages/add-category-page/add-category.component";
import { AddTrainerPageComponent } from "./pages/add-trainer-page/add-trainer.component";

export const AdminRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "main", pathMatch: "full" },
      {
        path: "main",
        component: HomePageComponent,
      },
      {
        path: "addcategory",
        component: AddCategoryPageComponent,
      },
      {
        path: "addtrainer",
        component: AddTrainerPageComponent,
      },
      {
        path: "addcourse",
        component: AddCoursePageComponent,
      },
      {
        path: "addblog",
        component: AddBlogPageComponent,
      },
      {
        path: "addsectioncourse",
        component: AddSectionPageComponent,
      },
    ],
  },
];
