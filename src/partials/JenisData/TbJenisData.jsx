import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const TbJenisData = () => {
  return (
    <div className="p-10 bg-white shadow-xl rounded-lg">
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>No</th>
            <th>Nama Cabang</th>
            <th>Data 1</th>
            <th>Data 2</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default TbJenisData;
