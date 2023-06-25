import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useContext, } from 'react'
import CategoryButton from './CategoryButton';
import AddCategory from './AddCategory';
import { UserContext } from '../../../../context/UserContext';
import { sortArray } from '../../../../helpers/Helpers';
import Logo from '../../../../assets/images/logo-transparent.png'
import { Outlet, useParams } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
export default function Category() {
  const { toggleAddCat, setToggleAddCat, categories } = useContext(UserContext);
  const params = useParams();

  return (
    <>
      {params.skuId ? <Outlet /> :
        <>
          <div className="flex flex-col mx-2 relative">
            <label className="text-2xl font-bold text-center">CATEGORIES</label>
            <div className='flex flex-row mx-2 mt-5 mb-5' >
              {categories && sortArray(categories).map((categ, index) => {
                return <div className='flex flex-row mx-2' key={index}>
                  <CategoryButton
                    text={categ.name}
                    path={categ.sku}
                    icons={Logo}
                  />
                </div>
              })}
              <div className="w-44 h-44 text-center shadow-2xl mx-2 rounded-2xl p-4 focus:bg-[#FD904D] hover:bg-[#FD904D] ease-in-out duration-600 active:scale-[0.95]" >

                <div className="relative items-center cursor-pointer" onClick={() => setToggleAddCat(true)}>
                  <FontAwesomeIcon icon={faPlusCircle} className='w-20 h-20 p-4' />
                </div>
                <p className="text-lg font-bold whitespace-nowrap">New Category</p>
              </div>
            </div>
          </div>
          {toggleAddCat && <AddCategory />}
        </>
      }
    </>
  )
}
