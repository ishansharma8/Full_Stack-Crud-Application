import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CRUD = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(''); //Add new form
  const [age, setAge] = useState('');
  const [isActive, setIsActive] = useState(0);

  const [editId, seteditId] = useState(''); //Edit form
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editisActive, setEditisActive] = useState(0);

  const empdata = [
    {
      id: 1,
      name: 'Smith',
      age: 20,
      isActive: 1,
    },

    {
      id: 2,
      name: 'Roy',
      age: 20,
      isActive: 1,
    },

    {
      id: 1,
      name: 'Liam',
      age: 20,
      isActive: 1,
    },
  ];

  const [data, setData] = useState(0); //api response

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('https://localhost:44345/api/Employee')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:44345/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setEditisActive(result.data.isActive);
        seteditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm('Are you sure you want to delete this employee') == true
    ) {
      axios
        .delete(`https://localhost:44345/api/Employee/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Employee has been deleted');
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:44345/api/Employee/${editId}`;
    const data = {
      id: editId,
      name: editName,
      age: editAge,
      isActive: editisActive,
    };
    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success('Employee has been Updated');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = 'https://localhost:44345/api/Employee';
    const data = {
      name: name,
      age: age,
      isActive: isActive,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success('Employee has been added');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName('');
    setAge('');
    setIsActive(0);
    setEditName('');
    setEditAge('');
    setEditisActive(0);
    seteditId('');
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditisActive(1);
    } else {
      setEditisActive(0);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={(e) => handleActiveChange(e)}
              value={isActive}
            />
            <label>isActive</label>
          </Col>

          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>

      <div>CRUD</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>

            <th>Name</th>
            <th>Age</th>
            <th>isActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>{' '}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : 'Loading...'}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modiy /Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={editisActive === 1 ? true : false}
                onChange={(e) => handleEditActiveChange(e)}
                value={editisActive}
              />
              <label>isActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CRUD;
