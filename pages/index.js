import React from 'react';
import './../public/styles.css';
import 'carbon-components/css/carbon-components.css';

import { useQuery } from '@apollo/react-hooks';
import { DataTable } from 'carbon-components-react';
import PEOPLE_QUERY from '../graphql/people.query';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'birthYear',
    header: 'BirthYear',
  },
  {
    key: 'height',
    header: 'Height',
  },
  {
    key: 'gender',
    header: 'Gender',
  },
  {
    key: 'planet',
    header: 'Planet'
  }
];

const Home = () => {
  const { data, loading, error } = useQuery(PEOPLE_QUERY);
  let rows = [];
  if (data && data.allPeople && data.allPeople.edges) {
    rows = data.allPeople.edges.map(item => ({
      id: (item.node && item.node.id) || '',
      name: (item.node && item.node.name.name) || '',
      birthYear: (item.node && item.node.birthYear) || '',
      height: (item.node && item.node.height) || '',
      gender: (item.node && item.node.gender) || '',
      planet: (item.node && item.node.homeworld && item.node.homeworld.name) || ''
    }));
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <p className="title">This is the app to demo get data from SWAPI GraphQL</p>
      <DataTable
        rows={rows}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    </div>
  );
};

export default Home;
