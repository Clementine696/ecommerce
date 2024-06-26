import React from "react";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {

    const {
        show,
        handleCancel,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage
    } = props;

    return (
      <Modal
        show={show}
        handleCancel={handleCancel}
        handleClose={handleClose}
        modalTitle={modalTitle}
      >
        <Row>
            <Col>
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="form-control-sm"
                />
            </Col>
            <Col>
                <select
                    className="form-control form-control-sm"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
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
        </Row>
        
        <Row>
            <Col>
                <Input
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryImage}
                />
            </Col>
        </Row>
      </Modal>
    );
  }

  export default AddCategoryModal;