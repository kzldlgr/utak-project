import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { sortArray, generateCategory } from '../../../../helpers/Helpers';
import CategoryButton from '../Items/CategoryButton';
import Logo from '../../../../assets/images/red-logo.png'
import { ref, remove, set, update } from 'firebase/database';
import { db } from '../../../../firebase';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
export default function Category() {
  const navigate = useNavigate();
  const { categories } = useContext(UserContext);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const params = useParams();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-500 p-2 text-white rounded-xl font-bold mx-1',
      cancelButton: 'bg-red-500 p-2 text-white rounded-xl font-bold mx-1'
    },
    buttonsStyling: false
  })

  const updateCategory = () => {
    update(ref(db, `Ninongs/category/${params.catId}`), {
      name: selectedCategory,
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${category} category! has been updated!`,
      showConfirmButton: false,
      timer: 1500
    })
    navigate(`/ninongs/utilities/category`, { replace: true })
  }
  useEffect(() => {
    fetchCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.catId])

  const addCategory = () => {
    const cat = generateCategory();
    set(ref(db, 'Ninongs/category/' + cat), {
      name: category,
      categoryId: cat,
    })
    setCategory("");
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Category! has been added!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const fetchCategories = () => {
    if (params.catId) {
      const select = categories.find(categ => categ.categoryId === params.catId)
      return setSelectedCategory(select)
    }
  }

  const handleDelete = () => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this Category and Items inside it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(db, `Ninongs/category/${params.catId}`))
        navigate(`/ninongs/utilities/category`, { replace: true })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your Category has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }


  return (
    <>
      <div className="flex flex-row mx-2 w-full h-[550px] ">
        <div className='w-2/3 flex-wrap flex-col border-r-gray-500 border-r px-5' >
          <div className='flex flex-row mx-2'>
            {categories && sortArray(categories).map((categ, index) => {
              return (
                <CategoryButton
                  key={index}
                  text={categ.name}
                  path={categ.categoryId}
                  icons={Logo}
                />)

            })}
          </div>
        </div>
        <div className="w-1/3 px-10 py-44 flex-auto align-middle justify-center" >
          {params.catId ?
            <>
              <div className="relative mb-2">
                <div className="absolute top-2 mt-1 mr-1 text-red-500 cursor-pointer">
                  <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} />
                </div>
                <h1 className='text-xl font-bold border-b-slate-600 border-b pl-5 p-2'>Edit Category</h1>
              </div>
              <div className='flex flex-row gap-2 mb-4'>
                <input
                  type="text"
                  value={selectedCategory.name}
                  onChange={(e) => { setSelectedCategory(e.target.value) }}
                  placeholder='Category name'
                  className=' w-[70%] border-2 p-1'
                />
                <button className=' p-2 w-[30%] rounded-2xl font-bold bg-[#FD904D] active:scale-[0.95] text-md' onClick={updateCategory}>Update</button>
              </div> </> :
            <>
              <div className="mb-2">
                <h1 className='text-xl font-bold border-b-slate-600 border-b p-2'>New Category</h1>
              </div>
              <div className='flex flex-row gap-2 mb-4'>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value) }}
                  placeholder='Category name'
                  className=' w-[70%] border-2 p-1'
                />
                <button className=' p-2 w-[30%] rounded-2xl font-bold bg-[#FD904D] active:scale-[0.95] text-md' onClick={addCategory}>Add</button>
              </div> </>
          }
        </div>
      </div >
    </>
  )
}
