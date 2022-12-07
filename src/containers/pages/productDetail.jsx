import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import { HeartIcon, MinusSmIcon, PlusSmIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { get_product } from '../../features/services/products/products.service';
import { add_item, get_items, get_item_total, get_total } from '../../features/services/cart/cart.service';
import { Oval } from 'react-loader-spinner';
import { useNotification } from '../../hooks/useNotification';

const producto = {
  rating: 4,
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(get_product(productId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const product = useSelector(state => state.products.product);
  const cart = useSelector(state => state.cart);
  const { displayNotification } = useNotification();

  const first_color = product && product.color[0] && product.color[0].data;

  const [selectedColor, setSelectedColor] = useState(first_color);

  const colores = product && product.color;

  let loading = false;

  const isLoading = useSelector(state => state.cart.status)

  if (isLoading === 'pending') {
    loading = true
  }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddToCart = e => {
    e.preventDefault()
    if (product && product !== null && product !== undefined && product.quantity > 0) {
      dispatch(add_item({product}));
      dispatch(get_items());
      dispatch(get_total());
      dispatch(get_item_total());

      const cart_error = cart.error
      if (cart_error) {
        displayNotification({ message: `${cart_error.error}`, type: 'error' });
      }
      navigate('/cart');
    }
  }

  const params = useParams();
  const productId = params.productId;

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product && product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <img src={image.get_thumbnail} alt="" className="w-full h-full object-center object-cover" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              {/* imagen del producto */}
              <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                {product && product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <img
                      src={image.get_thumbnail}
                      alt={image.alt_text}
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product && product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">$ {product && product.price}</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          producto.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{producto.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product && product.description }}
                />
              </div>
              {(colores && colores.length !== 0) && (
                <div>
                  <h3 className="text-sm text-gray-900 mt-5">Colores Disponibles:</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colores && Array.isArray(colores) ? colores.map((color) => (
                        <RadioGroup.Option
                          key={color.data.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.data.selectedColor,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {color.data.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.data.bgColor,
                              'h-8 w-8 border border-black border-opacity-10 rounded-full'
                            )}
                          />
                        </RadioGroup.Option>
                      )) : 'No es un array'
                      }
                    </div>
                  </RadioGroup>
                </div>
              )}
              <p className="mt-2">
                {
                  product &&
                  product !== null &&
                  product !== undefined &&
                  product.quantity > 0 ?
                  (
                    <>
                      <span className='flex text-green-500'>
                        Producto Disponible
                        <CheckCircleIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                      </span>
                    </>
                  ) :
                  (
                    <span className='flex text-red-500'>
                      Producto Agotado
                      <XCircleIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    </span>
                  )
                }
              </p>

              <form onSubmit={e => handleAddToCart(e)} className="mt-6">
                <div className="mt-4 flex sm:flex-col1">
                  {loading ?
                    <button
                      className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                      <Oval
                        color="#fff"
                        width={20}
                        height={20} />
                    </button>
                    :
                    <button
                      // onClick={addToCart}
                      type='submit'
                      className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                      Agregar al Carrito
                    </button>
                  }

                  <button
                    type="button"
                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {product && product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                            <ul>
                              {detail.item.map((item) => (
                                <li key={item.id}>{item.item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
}
