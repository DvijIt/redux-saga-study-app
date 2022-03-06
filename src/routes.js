import { Route, Switch } from "react-router-dom";
import PeopleTable from "./components/PeopleTable";
import App from "./pages/App";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";

export const MAIN_PAGE = "main";
export const PEOPLE = "people";
export const DETAILS = "details";
export const NOT_FOUND = "notfound";

export const routes = [
  { id: MAIN_PAGE, path: "/", exact: true, component: App },
  { id: PEOPLE, path: "/people", exact: true, component: PeopleTable },
  { id: DETAILS, path: "/people/:id", exact: true, component: Details },
  { id: NOT_FOUND, path: "*", component: NotFound },
];

export const getRoutesConfig = id => {
  const route = routes.find(route => route.id === id);

  if (route) {
    const { component, ...rest } = route;

    return rest;
  }
};

function Routes() {
  return (
    <Switch>
      {routes.map(router => {
        const { id, ...rest } = router;

        return <Route key={id} {...rest} />;
      })}
    </Switch>
  );
}

export default Routes;
