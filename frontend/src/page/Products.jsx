import React, { useEffect, useState } from 'react'
import { BASE_URL, network } from '../network/axiosInstance';
import { useQuery } from 'react-query';
import { Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProducts, setNewProducts] = useState({
    name: "",
    description: "",
  })
  const [updatedproducts, setUpdatedproducts] = useState(
    {
      id: undefined,
      name: "",
      description: "",
    }
  )
  const handleOk = () => {
    setIsModalOpen(false);
    network.updateItem(BASE_URL, updatedproducts.id, updatedproducts)
      .then(() => {
        refetch()
        toast("İnformation has been updated!")
      })
  };

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setNewProducts({
      ...newProducts,
      [name]: value
    }
    )
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const { data, isLoading, refetch } = useQuery(
    "product",
    async () => {
      return network.getAll(BASE_URL)
        .then(res => {
          setProducts(res)
        })
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newProducts.name != "" && newProducts.description != null) {
      network.addItem(BASE_URL, newProducts)
        .then(() => {
          refetch()
          toast("İnformation added!")
        })
    } else {
      alert("Fill in the information completely")
    }

  }
  const handleDelete = (id) => {
    console.log(id)
    network.deleteItem(BASE_URL, id)
      .then(() => {
        refetch()
        toast("İnformation deleted!")
      })
  }
  const handleUpdate = (item) => {
    setIsModalOpen(true);
    setUpdatedproducts({
      id: item._id,
      name: item.name,
      description: item.description,
    })
  }
  const handleUpdated = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUpdatedproducts(
      {
        ...updatedproducts,
        [name]: value
      }
    )
  }
  return (
   <div className='container'>
     <div className='crudContainer'>
      <ToastContainer />
      <h1>Crud App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' name='name' onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id='description' name='description' onChange={handleChange} />
        </div>
        <button className='addbtn'>Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>İd</th>
            <th>Name</th>
            <th>Description</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {
            products && (
              products.map((x, i) => (
                <tr key={i}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>{x.description}</td>
                  <td><button className='deletebtn' onClick={() => handleDelete(x._id)}>Delete</button></td>
                  <td><button className='updatebtn' onClick={() => handleUpdate(x)}>Update</button></td>
                </tr>
              ))
            )
          }
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
            {
              updatedproducts && (
                <div className='modal'>
                  <div>
                    <label htmlFor="Name">Name</label>
                    <input type="text" value={updatedproducts.name} name='name' id='Name' onChange={handleUpdated} />
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" value={updatedproducts.description} name='description' id='description' onChange={handleUpdated} />
                  </div>
                </div>
              )
            }
          </Modal>
        </tbody>
      </table>
    </div>
   </div>
  )
}

export default Products
