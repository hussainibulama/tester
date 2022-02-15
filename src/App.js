/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Switch } from "react-router-dom";
import AppRoute from "./hoc/appRoute";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./store/actions";
import axios from "./utils/axios";
import { toast } from "react-toastify";

// layouts
import AuthLayout from "./layouts/auth";
import DashboardLayout from "./layouts/dashboard";

// pages
import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { InsightsPage } from "./pages/insights";
import { PagesPage } from "./pages/pages";
import { ServicesPage } from "./pages/services";
import { ProfilePage } from "./pages/profile";
import { CaseStudyPage } from "./pages/case_studies";
import { PartnersPage } from "./pages/partners";
import { ClientsPage } from "./pages/clients";
import { CreateClientsPage } from "./pages/clients/createClients";
import { CreatePartnersPage } from "./pages/partners/createPartners";
import { CareersPage } from "./pages/careers";
import { CreateCareersPage } from "./pages/careers/createCareers";
import { SelectTemplatePage } from "./pages/pages/templates";
import { CreateInsightsPage } from "./pages/insights/createInsights";
import { CreateServicesPage } from "./pages/services/createInsights";
import { CreateCaseStudyPage } from "./pages/case_studies/createCaseStudy";
import { RolesPage } from "./pages/roles";
import { MenuPage } from "./pages/menu";
import { CreatePage } from "./pages/pages/createPage";
import { EditCaseStudyPage } from "./pages/case_studies/edit";
import { EditClientsPage } from "./pages/clients/edit";

function App() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => {
    return {
      currentUser: state.auth.currentUser,
    };
  });

  async function fetchCategories() {
    try {
      const response = await axios.get("/menu-categories");
      dispatch(actions.setMenuCategory(response.data.categories));
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Switch>
        <AppRoute path="/" exact component={LoginPage} layout={AuthLayout} />
        <AppRoute path="/Login" component={LoginPage} layout={AuthLayout} />
        <AppRoute
          path="/Dashboard"
          component={DashboardPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Pages"
          exact
          component={PagesPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Pages/Select-Template"
          component={SelectTemplatePage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Profile"
          component={ProfilePage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Services"
          exact
          component={ServicesPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/CaseStudy"
          exact
          component={CaseStudyPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Clients"
          exact
          component={ClientsPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Partners"
          exact
          component={PartnersPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Careers"
          exact
          component={CareersPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Roles"
          exact
          component={RolesPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Menu"
          exact
          component={MenuPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Insights"
          exact
          component={InsightsPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Pages/:template/Create-Page"
          component={CreatePage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Clients/Create-Client"
          component={CreateClientsPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Partners/Create-Partner"
          component={CreatePartnersPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Careers/New-Career"
          component={CreateCareersPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Insights/Create-Insight"
          component={CreateInsightsPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Services/Create-Service"
          component={CreateServicesPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/adverts/view/:id"
          component={CreateCaseStudyPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/CaseStudy/edit/:id"
          component={EditCaseStudyPage}
          layout={DashboardLayout}
        />
        <AppRoute
          path="/Clients/edit/:id"
          component={EditClientsPage}
          layout={DashboardLayout}
        />
      </Switch>
    </>
  );
}

export default App;
