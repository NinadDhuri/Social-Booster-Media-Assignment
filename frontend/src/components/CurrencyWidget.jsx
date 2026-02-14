import React, { useEffect, useState } from 'react';
import { getExchangeRates } from '../api';
import { RefreshCw } from 'lucide-react';

const CurrencyWidget = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getExchangeRates();
      // Use USD as base
      const usdRates = response.data.rates;
      setRates(usdRates);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Failed to load rates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  if (loading && !rates) return <div className="p-4 bg-white rounded-lg shadow animate-pulse">Loading rates...</div>;

  const mainCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Exchange Rates (USD)</h3>
        <button
          onClick={fetchRates}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
          title="Refresh Rates"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {rates && (
        <ul className="space-y-2">
          {mainCurrencies.map(currency => (
            <li key={currency} className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">{currency}</span>
              <span className="text-gray-900">{rates[currency].toFixed(4)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-right">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default CurrencyWidget;
