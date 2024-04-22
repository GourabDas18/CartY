import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { getDocs, collection, where, query } from "firebase/firestore";
import { addMenProduct } from "../redux/storeSlice";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import Filter from "../Component/Filter";
import { store } from "../redux/store";
import Loading from "../Component/Loading";
import Footer from "../Component/Footer";
const Men = () => {
    const[loading,setLoading]=useState(true);
    const [shirt, setShirt] = useState(true);
    const [tshirt, setTshirt] = useState(true);
    const [shirtCollection, setShirtCollection] = useState([]);
    const [tshirtCollection, setTshirtCollection] = useState([]);
    const dispatch = useDispatch();
    const men_product = useSelector(state => state.storeSlice.men)
    useEffect(() => {
        setShirtCollection(men_product.filter(item => item.type === "shirt"));
        setTshirtCollection(men_product.filter(item => item.type === "tshirt"));
    }, [men_product])

    useEffect(() => {
        if (men_product.length < 1) {
            try {
                getDocs(query(collection(db, "men"),where("gender","==","men"))).then(docsnap => {
                    const products = []
                    docsnap.forEach(element => {
                        products.push(element.data())
                    });
                    dispatch(addMenProduct([...products]));
                    setLoading(false);
                })
            } catch (error) {
                console.log(error)
            }
        }else{
            setLoading(false);
        }
    }, [])
    return <div className="relative min-h-screen pb-72">
        <div className="flex flex-col justify-center items-center gap-2">
            <Header page={"Men"} totalcartItems={store.getState().storeSlice.user[0]?.cart.length}/>
            <span className="w-full relative px-4  md:mt-10">
                <Link to={"/"} className="text-sm">CartY</Link>
                <span> / </span>
                <Link to={"/men"} className="text-md font-semibold">Men</Link>
            </span>
            {loading?<Loading />:<></>}
            {
                tshirt && !loading ?
                    <span className="m-4 font-semibold underline w-full px-4">
                        T-shirt Collection
                    </span>
                    : <></>
            }
            <Filter products={men_product} setShirt={setShirt} setTshirt={setTshirt} shirt={shirt} tshirt={tshirt} setShirtCollection={setShirtCollection} setTshirtCollection={setTshirtCollection} shirtCollection={shirtCollection} tshirtCollection={tshirtCollection}/>
            <div className="w-full relative">
                <div className="flex min-w-full justify-between  overflow-y-hidden relative px-10 flex-row gap-4 md:flex-col">
                    {
                        tshirtCollection.map((item) => {
                            if (tshirt === true) {
                                return <>
                                    <Link to={"/"+item.gender+"/" + item.id} >
                                        <div className=" relative min-w-[16rem] bg-cover h-80 " style={{ backgroundImage: `url("${item.images1}")` }}>
                                            <div className=" flex flex-col justify-start items-start gap-2 absolute bottom-0 p-2">
                                                <span className=" text-white [text-shadow:_0px_1px_7px_black] font-semibold text-xl">₹ {item.price}</span>
                                                <span className="text-white font-semibold bg-[#0b0d0e2b] text-lg p-0.5 px-2 rounded-sm">{item.company}</span>
                                                <span className="text-sm text-white [text-shadow:_0px_1px_7px_black]">{item.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            }else{
                                return <></>
                            }
                        })
                    }
                </div>
            </div>


            {
                shirt && !loading
                    ? <span className="m-4 font-semibold underline w-full px-4 md:mt-20">
                        Shirt Collection
                    </span>
                    : <></>
            }
            <div className="w-full relative">
                <div className="flex min-w-full justify-between overflow-y-hidden relative px-10 flex-row gap-4 md:flex-col">
                    {
                        shirtCollection.map((item) => {
                            if (shirt === true) {
                                return <>
                                    <Link to={"/"+item.gender+"/" + item.id} >
                                        <div className=" relative min-w-[16rem] bg-cover h-80 " style={{ backgroundImage: `url("${item.images1}")` }} >
                                            <div className=" flex flex-col justify-start items-start gap-2 absolute bottom-0 p-2">
                                                <span className=" text-white [text-shadow:_0px_1px_7px_black] font-semibold text-xl">₹ {item.price}</span>
                                                <span className="text-white font-semibold bg-[#0b0d0e2b] text-lg p-0.5 px-2 rounded-sm">{item.company}</span>
                                                <span className="text-sm text-white [text-shadow:_0px_1px_7px_black] ">{item.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            }else{
                                return <></>
                            }
                        })
                    }
                </div>
            </div>


        </div>
        <Footer page={"Home"} totalcartItems={store.getState().storeSlice.user[0]?.cart.length}/>
    </div>
}
export default Men;