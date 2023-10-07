'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const page = () => {
  const [query, setQuery] = useState('');
  const [farheneit, setFarheneit] = useState(false);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState({
    loading: false,
    data: {
      weather: [''],
    },
    error: false,
  });

  const search = async (event) => {
    setQuery('');
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const appid = 'f00c38e0279b7bc85480c3fe775d518c';

    await axios
      .get(url, {
        params: {
          q: query || 'Mumbai',
          units: 'metric',
          appid: appid,
        },
      })
      .then((res) => {
        console.log('res', res);
        setWeather({ data: res.data, loading: false, error: false });
        console.log(res.data);
      })
      .catch((error) => {
        setWeather({ ...weather, data: {}, error: true });
        setQuery('');
        setError(true);
        console.log('error', error);
      });
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className='min-h-screen realtive bg-gray-100 pt-32 pb-32 md:p-52'>
      <div className='absolute top-10 right-10 flex justify-center items-center'>
        <button
          onClick={() => setFarheneit(false)}
          className={`p-1 px-3 text-sm rounded-full ${
            !farheneit
              ? 'bg-fuchsia-500'
              : 'border border-black text-black hover:bg-black hover:text-white transition'
          } mr-2`}
        >
          Celcius
        </button>
        <button
          onClick={() => setFarheneit(true)}
          className={`p-1 px-3 text-sm rounded-full ${
            !farheneit
              ? 'border border-black text-black hover:bg-black hover:text-white transition'
              : 'bg-fuchsia-500'
          }`}
        >
          Farenheit
        </button>
      </div>
      <div className='flex flex-col md:flex-row justify-center max-w-2xl mx-auto'>
        <div className='p-7 m-4 md:h-52 text-black bg-white rounded-3xl shadow-md max-w-md shadow-amber-500'>
          <h1 className='text-4xl font-bold'>Weather.io</h1>
          <p className='mt-2 leading-tight text-sm text-neutral-500'>
            fetch weather via location <br /> get temeprature, weather type,
            wind speed etc.
          </p>
          <div className='flex items-center mt-5'>
            <input
              className='p-2 px-4 w-full border rounded-full bg-gray-50 focus:outline-black'
              placeholder='Search City'
              name='query'
              value={query}
              onChange={(event) => {
                if (error) {
                  setError(false);
                }
                setQuery(event.target.value);
              }}
            />
            <button
              className='p-2 ml-3 rounded-full bg-sky-500 hover:bg-sky-600 transition hover:cursor-pointer'
              onClick={search}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 text-white stroke-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
          </div>
        </div>
        {weather && weather.data && weather.data.main && (
          <div className='p-7 h-52 md:w-52 flex flex-col justify-between border m-4 bg-gradient-to-t from-violet-200 via-blue-400 to-blue-900 rounded-3xl shadow-md shadow-violet-500 hover:scale-105 transition'>
            <div>
              <div className='flex items-start'>
                <p className='font-semibold'>{weather.data.name}</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-5 h-5 ml-2'
                >
                  <path
                    fillRule='evenodd'
                    d='M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <p className='text-5xl mt-2 font-thin'>
                {!farheneit
                  ? `${Math.ceil(weather.data.main.temp)}°`
                  : `${Math.ceil(
                      (weather.data.main.temp * 9.0) / 5.0 + 32.0
                    )}°F`}
              </p>
            </div>
            <img
              className='w-10 -ml-2 -mb-1'
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            <p className='text-sm leading-snug font-bold'>
              {weather && `${weather.data.weather[0].main}`}
            </p>
            <p className='text-sm leading-snug font-semibold'>
              W:{weather.data.wind.speed} H:
              {weather.data.main.humidity}
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className='mx-auto mt-5 p-1 px-2 bg-rose-200 text-rose-600 text-sm max-w-max flex items-center rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6 text-rose-600 mr-1'
          >
            <path
              fillRule='evenodd'
              d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
              clipRule='evenodd'
            />
          </svg>

          <p>{'City not found please try again :)'}</p>
        </div>
      )}
    </div>
  );
};

export default page;
