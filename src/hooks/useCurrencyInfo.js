import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                );
                const json = await res.json();

                // ✅ Correct format
                if (json && json[currency]) {
                    setData(json[currency]);
                } else {
                    setData({});
                }
            } catch (err) {
                console.error("Error fetching currency data:", err);
                setData({});
            }
        };

        fetchData();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;


