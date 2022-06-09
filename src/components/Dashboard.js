import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip, Legend);

var delayed;
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false
        },
        title: {
            display: true,
            text: 'Expenses',
            font: {
                size: 22,
                family: "courier"
            },
        },
    },
    animation: {
        onComplete: () => {
            delayed = true;
        },
        delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
        },
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true
        }
    }
};
// export const options1 = {
//     responsive: true,
//     plugins: {
//         legend: {
//             display: false
//             // position: 'right', 
//             // align:'center',
//             // labels : {
//             //     padding:20
//             // }
//         },
//         title: {
//             display: true,
//             text: 'Categories',
//             font: {
//                 size: 18,
//                 family: "courier",
//                 weight: 'bold',
//             }
//         },
//     }
// }
export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            align: 'center',
            labels: {
                padding: 20
            }
        },
        title: {
            display: true,
            text: 'Asset Status',
            position: 'top',
            font: {
                size: 22,
                family: "courier",
                weight: 'bold'
            }
        }
    },
    // scales: {
    //     r: {
    //       ticks: {
    //         display: false
    //       }
    //     }
    //   }
}

export const data1 = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [
        {
            data: [2000, 3000, 5000, 4000, 8000, 6000, 1500, 6400, 9300, 5600, 2300, 4700],
            borderColor: 'rgb(255, 99, 132)',
            fill: false

        },
    ],
};


var palette = [
    'rgb(255, 159, 64,0.7)',
    'rgb(204, 41, 41,0.7)',
    'rgb(0, 163, 51,0.7)',
    'rgb(54, 162, 235,0.7)',
    'rgb(153, 102, 255,0.7)',
    'rgb(0, 143, 145,0.7)',
    'rgb(0,0,255,0.7)'
   ];
export const data3 = {
    labels: ['Assigned', 'Not Assigned', 'Condemned', 'Missing', 'Spare', 'Transferred'],
    datasets: [
        {
            label: '# of Votes',
            data: [1000, 457, 250, 120, 149, 387],
            backgroundColor: function(context) {
                return palette[context.dataIndex % palette.length];
              },             
            borderWidth:4.5,
        },
    ],
};

// export const data2 = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [
//         {
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 20, 8, 15, 6],
//             backgroundColor: function(context) {
//                 return palette[context.dataIndex % palette.length];
//               },             
//             borderWidth: 4,
//         },
//     ],
// };

export default function Dashboard() {
    return (
        <>
            <div>
                <div class="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-5 py-10">
                    <span aria-label="card 1" href="javascript:void(0)" className="bg-white dark:bg-gray-800 rounded  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none focus:bg-gray-100 hover:bg-gray-100">
                        <div class="shadow px-8 py-6 flex items-center bg-gradient-to-r from-[#000046] to-[#1CB5F9] ">
                            <div class="p-4 bg-stone-50 rounded text-gray-800">
                                {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/medium_stat_cards_with_icon-svg1.svg" alt="icon"/> */}
                                {/* <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg> */}
                                <p
                                    class=" py-1.5 text-black-600 dark:text-black-400 text-sm tracking-normal font-bold text-xl leading-5"
                                >2022
                                </p>
                            </div>

                            <div class="ml-6">
                                <h3 class="mb-1 leading-5 text-white font-bold text-2xl">Consumable Items
                                </h3>
                                <p
                                    class=" py-1.5 text-white text-sm tracking-normal font-semibold text-xl leading-5">
                                    ₹ 10,000</p>
                            </div>

                        </div>
                    </span>
                    <span aria-label="card 2" href="javascript:void(0)" class="bg-white dark:bg-gray-800 rounded  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none focus:bg-gray-100 hover:bg-gray-100">
                        <div class=" shadow px-8 py-6 flex items-center bg-gradient-to-r from-[#FF5E62] to-[#FF9966]">
                            <div class="p-4 bg-stone-50 rounded text-gray-600">
                                {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/medium_stat_cards_with_icon-svg2.svg" alt="icon"/> */}
                                {/* <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg> */}
                                <p
                                    class=" py-1.5 text-black-600 dark:text-black-400 text-sm tracking-normal font-bold text-xl leading-5"
                                >2022
                                </p>
                            </div>
                            <div class="ml-6">
                                <h3 class="mb-1 leading-5 text-white font-bold text-2xl">Non-Consumable</h3>
                                <p
                                    class="py-1.5 text-white text-sm tracking-normal font-semibold text-xl leading-5">
                                    ₹ 5,000</p>
                            </div>
                        </div>
                    </span>

                    <span aria-label="card 4" href="javascript:void(0)" class="bg-white dark:bg-gray-800 rounded  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none focus:bg-gray-100 hover:bg-gray-100">
                        <div class="shadow px-8 py-6 flex items-center bg-gradient-to-r from-[#800080] to-[#FFC0CB]">
                            <div class="p-4 bg-stone-50 rounded text-gray-800">
                                {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/medium_stat_cards_with_icon-svg4.svg" alt="icon"/> */}
                                {/* <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                <p
                                    class=" py-1.5 text-black-600 dark:text-black-400 text-sm tracking-normal font-bold text-xl leading-5"
                                >2022
                                </p>
                            </div>
                            <div class="ml-6">
                                <h3 class="mb-1 leading-5 text-white font-bold text-2xl">Total Expenses
                                </h3>
                                <p
                                    class="py-1.5 text-white text-sm font-semibold text-xl leading-5">
                                    ₹ 15,000</p>
                            </div>
                        </div>
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                {/* <div className='flex justify-center items-center'>
                    <div className='w-7/12'>
                        <Pie options={options1} data={data2} />
                    </div>
                </div> */}

                <div className='py-5 px-4 flex justify-center items-center'>
                    <div className='w-full'>
                        <Line options={options} data={data1} />
                    </div>
                </div>

                <div className='pb-4 flex justify-center items-center'>
                    <div className='w-8/12'>
                        <Pie options={options2} data={data3} />
                    </div>
                </div>

            </div>
        </>
    )
}
