import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LOAD_USERS } from "../redux/reducers/people/actions";
import { selectPeople } from "../redux/reducers/people/selectors";
import PeopleTablePagination from "./PeopleTablePagination";

function PeopleTable() {
  const people = useSelector(selectPeople);
  const dispatch = useDispatch();

  const onChangePage = useCallback(
    pageIndex => {
      dispatch({ type: LOAD_USERS, payload: { page: pageIndex, search: people.search } });
    },
    [dispatch, people.search],
  );

  const onChangeSearch = ({ target }) =>
    dispatch({ type: LOAD_USERS, payload: { page: 1, search: target?.value } });

  return (
    <>
      {people.loading && <div>...loading</div>}
      {people.data && (
        <>
          <h1>Star Wars People</h1>
          <form style={{ display: "inline-block" }}>
            <input
              style={{ padding: "10px 20px", marginBottom: "10px" }}
              type="text"
              placeholder="Search people"
              value={people.search}
              onChange={onChangeSearch}
            />
          </form>
          <table border={1} cellSpacing={0} cellPadding={2} width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth year</th>
                <th>Eye color</th>
                <th>Gender</th>
                <th>Heir color</th>
                <th>Height</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {people?.data?.results.map(character => {
                const { name, birth_year, eye_color, gender, heir_color, height } = character;
                const id = character.url.replace(/\D/g, '');

                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{birth_year}</td>
                    <td>{eye_color}</td>
                    <td>{gender}</td>
                    <td>{heir_color}</td>
                    <td>{height}</td>
                    <td><Link to={`people/${id}`}>Details</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PeopleTablePagination
            page={people.page}
            total={people.data.count}
            onChange={onChangePage}
          />
        </>
      )}
    </>
  );
}

export default PeopleTable;
