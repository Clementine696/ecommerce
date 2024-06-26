import React from "react";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Row, Col } from "react-bootstrap";
// import Modal

const UpdateCategoriesModal = (props) => {

    const {
        show,
        handleCancel,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
    } = props;

    return (
            <Modal
            show={show}
            handleCancel={handleCancel}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
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
                      {categoryList.map((option) => (
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
                      {categoryList.map((option) => (
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

  export default UpdateCategoriesModal;