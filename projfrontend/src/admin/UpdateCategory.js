import React,{useState, useEffect} from 'react'
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import {getCatergories, getCategory,updateCategory} from './helper/adminapicall';
import {isAuthenticated} from '../auth/helper/index';


 const UpdateCategory = ({match}) => {

    const {user,token} = isAuthenticated();

    const [values, setValues] = useState({
      name:"",
      loading: false,
      error:"",
      createdProduct:"",
      getaRedirect:false,
      formData:"" 
    });

    const {
           name,
           loading,
           error,
           createdProduct,
           getaRedirect,
           formData
           } = values;

    const preload = categoryId => {
        getCategory(categoryId)
      .then(data => {
        if(data.error){
          setValues({...values, error: data.error});
        }else{
          setValues({
            ...values,
            name: data.name,
            formData: new FormData()
          });
        }
      })
    }


    useEffect(() => {
      preload(match.params.categoryId);
    }, []);

    const onSubmit = event => {
      event.preventDefault();
      setValues({...values,error:"",loading:true});
      updateCategory(match.params.categoryId ,user._id, token, name).then(data => {
        if(data.error){
          setValues({...values,error: data.error})
        }
        else{
         setValues({
           ...values,
           name:"",
           loading: false,
           createdProduct: data.name
         })   
        }
      })
    }

    const handleChange = name => event => {
     
     const value =  event.target.value;
     formData.set(name,value);
     setValues({...values, [name]: value})
    };
    
    const successMessage = () => (
     <div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "none"}}>
      <h4>{createdProduct} Updated successfully</h4>
     </div>
    )

    const errorMessage = () => {

    }

    const createProductForm = () => (
        <form>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>   
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success mb-3"
          >
            Update Product
          </button>
        </form>
      );

    return (
        <Base title="Add a product here!"
         description="Welcome to product reation section"
         className="container bg-info p-4"
        >
         <Link to="/admin/categories" className="btn btn-md btn-dark mb-3">Admin Home</Link>
         <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
           {successMessage()} 
           {createProductForm()}
          </div> 
         </div>
        </Base>
    )
}

export default UpdateCategory;