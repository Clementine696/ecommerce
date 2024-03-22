import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types'
import Layout from "../../components/Layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory, updateCategories, deleteCategories as deleteCategoriesAction } from "../../actions";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import CheckboxTree from 'react-checkbox-tree'
import { IoCheckboxOutline, IoCheckboxSharp, IoCaretDownSharp, IoCaretForward, IoCheckmarkCircleOutline } from "react-icons/io5";

import 'react-checkbox-tree/lib/react-checkbox-tree.css';


function Category(props) {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  //New Category
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [show, setShow] = useState(false);
  const handleCancel = () => setShow(false);
  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //Category Tree
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  //Update Categories
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const cancelUpdateCategory = () => setShowUpdateCategory(false);
  const closeUpdateCategoryForm = () => {

    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('type', item.type);
      form.append('parentId', item.parentId ? item.parentId : "");
    })
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('type', item.type);
      form.append('parentId', item.parentId ? item.parentId : "");
    })
    dispatch(updateCategories(form))
    .then(result => {
      dispatch(getAllCategory())
    })

    setShowUpdateCategory(false)
  }

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value)
      category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value)
      category && expandedArray.push(category);
    })

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    // console.log({ checked, checkedArray, expanded, expandedArray})
  }

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setShowUpdateCategory(true);
  }

  //Delete Categories
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const cancelDeleteCategory = () => setShowDeleteCategory(false);
  const closeDeleteCategoryForm = () => {
    setShowDeleteCategory(false);
  }

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setShowDeleteCategory(true);
  }

  const deleteCategories= () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
    const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    
    if(checkedIdsArray.length > 0){
      dispatch(deleteCategoriesAction(checkedIdsArray))
      .then(result => {
        if(result){
          dispatch(getAllCategory());
          setShowDeleteCategory(false);
        }
      });
    }
  }

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      );

      // myCategories.push(
      //   <li key={category.name}>
      //     {category.name}
      //     {category.children.length > 0 ? (
      //       <ul> {renderCategories(category.children)} </ul>
      //     ) : null}
      //   </li>
      // );
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name, parentId: category.parentId });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if(type == 'checked'){
      const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value} : item)
      setCheckedArray(updatedCheckedArray);
    }else if(type == 'expanded'){
      const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value} : item)
      setExpandedArray(updatedExpandedArray);
    }
  }


  const renderAddCategoryModal = () => {
    return (
      <Modal
        show={show}
        handleCancel={handleCancel}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
      >
        <Input
          value={categoryName}
          placeholder={`Category Name`}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {" "}
              {option.name}{" "}
            </option>
          ))}
        </select>

        <Input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>
    );
  }

  const renderUpdateCategoriesModal = () => {
    return (
            <Modal
            show={showUpdateCategory}
            handleCancel={cancelUpdateCategory}
            handleClose={closeUpdateCategoryForm}
            modalTitle={"Update Category"}
            size="lg"
          >
            <Row>
              <Col>
              <h6>Expanded</h6>
              </Col>
            </Row>
            {
              expandedArray.length > 0 &&
              expandedArray.map((item, index) => 
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                    >
                      <option>select category</option>
                      {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                          {" "}
                          {option.name}{" "}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                      <select className="form-control">
                        <option value="">Select Type</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page">Page</option>
                      </select>
                  </Col>
                </Row>
              )
            }
            <Row>
              <Col>
              <h6>Checked</h6>
              </Col>
            </Row>
            {
              checkedArray.length > 0 &&
              checkedArray.map((item, index) => 
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                    >
                      <option>select category</option>
                      {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                          {" "}
                          {option.name}{" "}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                      <select className="form-control">
                        <option value="">Select Type</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page">Page</option>
                      </select>
                  </Col>
                </Row>
              )
            }
    
            {/* <Input
              type="file"
              name="categoryImage"
              onChange={handleCategoryImage}
            /> */}
          </Modal>
    );
  }

  const renderDeleteCategoryModal = () => {
    return (
      <Modal  modalTitle={"Confirm Delete"}
              show={showDeleteCategory}
              handleCancel={cancelDeleteCategory}
              handleClose={closeDeleteCategoryForm}
              size="lg"
              buttons={[
                {
                  label: 'No',
                  color: 'primary',
                  onClick: () => {
                    alert('no');
                  }
                },
                {
                  label: 'Yes',
                  color: 'danger',
                  onClick: () => {
                    deleteCategories();
                  }
                }
              ]}
              >
        <h5>Expanded</h5>
        {
          expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
        }
        <h5>Checked</h5>
        {
          checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
        }
      </Modal>
    );
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <Button onClick={handleShow}>Add</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                  check: <IoCheckboxSharp/>,
                  uncheck: <IoCheckmarkCircleOutline/>,
                  halfCheck: <IoCheckmarkCircleOutline/>,
                  expandClose: <IoCaretForward/>,
                  expandOpen: <IoCaretDownSharp/>
                }}
                // IoCheckboxOutline, IoCheckboxSharp, IoCaretDownSharp, IoCaretForward 
            />
          </Col>
        </Row>
        <Row>
          <Col>
                <button onClick={deleteCategory}>Delete</button>
                <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>
      
      {renderAddCategoryModal()}
      {renderUpdateCategoriesModal()}
      {renderDeleteCategoryModal()}

    </Layout>
  );
}

// Category.propTypes = {}

export default Category;
