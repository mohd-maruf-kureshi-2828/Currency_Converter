// import { useState } from 'react'
// import { InputBox } from './components'
// import useCurrencyInfo from './hooks/useCurrencyInfo'
// import React from 'react'

// function App() {
//     const [amount, setAmount] = useState(0)
//     const [from, setFrom] = useState("usd")
//     const [to, setTo] = useState("inr")
//     const [convertedAmount, setConvertedAmount] = useState(0)

//     const currencyInfo = useCurrencyInfo(from)
//     const options = Object.keys(currencyInfo)

//     const swap = () => {
//         setFrom(to)
//         setTo(from)
//         setConvertedAmount(amount)
//         setAmount(convertedAmount)
//     }

//     const convert = () => {
//         setConvertedAmount(amount * currencyInfo[to])
//     }

//     return (
//         <div
//             className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
//             style={{
//                 backgroundImage: `url('https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg')`,
//             }}
//         >
//             <div className="w-full">
//                 <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
//                     <form
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             convert()
//                         }}
//                     >
//                         {/* From Box */}
//                         <div className="w-full mb-1">
//                             <InputBox
//                                 label="From"
//                                 amount={amount || ""} // ✅ fallback empty string
//                                 currencyOptions={options}
//                                 onCurrencyChange={(currency) => setFrom(currency)}
//                                 selectCurrency={from}
//                                 onAmountChange={(val) => setAmount(val || 0)} // ✅ safe number conversion

//                             />
//                         </div>


//                         <div className="relative w-full h-0.5">
//                             <button
//                                 type="button"
//                                 className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
//                                 onClick={swap}
//                             >
//                                 swap
//                             </button>
//                         </div>

//                         {/* To Box */}
//                         <div className="w-full mt-1 mb-4">
//                             <InputBox
//                                 label="To"
//                                 amount={convertedAmount}
//                                 currencyOptions={options}
//                                 onCurrencyChange={(currency) => setTo(currency)} // ✅ yaha change
//                                 selectCurrency={to} // ✅ from ki jagah to likh
//                                 amountDisable
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
//                         >
//                             Convert {from.toUpperCase()} to {to.toUpperCase()}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default App


import React, { useState } from "react";
import { InputBox } from './components'
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);
    const options = Object.keys(currencyInfo || {});

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        } else {
            setConvertedAmount(0);
        }
    };

    return (
        <div
            className="w-full min-h-screen flex flex-wrap justify-center items-center bg-cover bg-center p-5"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/747113/pexels-photo-747113.jpeg')`,
            }}
        >
            <div className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/30 border border-gray-200 rounded-lg p-5 shadow-lg">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert();
                    }}
                >
                    <InputBox
                        label="From"
                        amount={amount}
                        currencyOptions={options}
                        onCurrencyChange={(currency) => setFrom(currency)}
                        selectCurrency={from}
                        onAmountChange={(val) => setAmount(val || 0)}
                        placeholder="Enter amount"
                        className="mb-3"
                    />

                    <div className="w-full flex justify-center my-3">
                        <button
                            type="button"
                            onClick={swap}
                            className="transform transition-transform duration-300 hover:rotate-180 bg-blue-600 text-white px-3 py-1.5 rounded-md shadow-md"
                        >
                            🔄 Swap
                        </button>
                    </div>

                    <InputBox
                        label="To"
                        amount={convertedAmount}
                        currencyOptions={options}
                        onCurrencyChange={(currency) => setTo(currency)}
                        selectCurrency={to}
                        amountDisable
                        placeholder="Converted amount"
                        className="mb-4"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200 shadow-md"
                    >
                        Convert {from.toUpperCase()} → {to.toUpperCase()}
                    </button>
                </form>

                {convertedAmount > 0 && (
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg text-center font-medium text-blue-800 transition-all duration-500">
                        {amount} {from.toUpperCase()} = {convertedAmount.toFixed(2)}{" "}
                        {to.toUpperCase()}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
