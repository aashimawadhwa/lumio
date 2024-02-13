import Property1 from 'src/assets/images/Property1.png';
import Property2 from 'src/assets/images/Property2.png';
import Property3 from 'src/assets/images/Property3.png';

export const details = [
  {
    type: 'Name',
    value: 'Michael Stevenson',
  },
  {
    type: 'Number',
    value: '+971 055 552 0212',
  },
  {
    type: 'No. of Occupants',
    value: '1',
  },
  {
    type: 'Address',
    value: 'Bay Square #501',
  },
  {
    type: 'City',
    value: 'Business Bay, Dubai',
  },
  {
    type: 'Contract',
    value: 'A10ZBB2',
  },
  {
    type: 'Property',
    value: '(Al Safa Villa #303)',
  },
];

export const Properties = [
  {
    id: 1,
    propertyName: 'H Residence',
    unitName: 'Unit 392',
    image: Property1,
  },
  {
    id: 2,
    propertyName: 'The Fold',
    unitName: 'Unit 291',
    image: Property2,
  },
  {
    id: 3,
    propertyName: 'Apartment 303',
    unitName: 'Unit 192',
    image: Property3,
  },
  {
    id: 4,
    propertyName: 'Apartment 1240',
    unitName: 'Unit 492',
    image: Property1,
  },
  {
    id: 5,
    propertyName: 'Apartment 74',
    unitName: 'Unit 342',
    image: Property2,
  },
];

export const explore = [
  {
    id: 1,
    propertyName: 'H Residence',
   price: '150,000 AED',
    image: Property1,
  },
  {
    id: 2,
    propertyName: 'The Fold',
   price: '150,000 AED',
    image: Property2,
  },
  {
    id: 3,
    propertyName: 'Apartment 303',
   price: '150,000 AED',
    image: Property3,
  },
  {
    id: 4,
    propertyName: 'Apartment 1240',
   price: '150,000 AED',
    image: Property1,
  },
  {
    id: 5,
    propertyName: 'Apartment 74',
   price: '150,000 AED',
    image: Property2,
  },
];


export const FilterTypes = {
  properties: {
    name: 'Properties',
    values: [
      {
        id: 1,
        name: 'Property 1',
        selected: true,
      },
      {
        id: 2,
        name: 'Property 2',
        selected: false,
      },
      {
        id: 3,
        name: 'Property 3',
        selected: false,
      },
    ],
  },
  type: {
    name: 'Type',
    values: [
      {
        id: 1,
        name: 'Rent',
        selected: false,
      },
      {
        id: 2,
        name: 'Amenity',
        selected: false,
      },
      {
        id: 3,
        name: 'Maintenance',
        selected: false,
      },
      {
        id: 4,
        name: 'Penalties',
        selected: false,
      },
      {
        id: 5,
        name: 'Credit Memos',
        selected: false,
      },
    ],
  },
  time: {
    name: 'Time',
    currId: 1,
    values: [
      {
        id: 1,
        name: 'Last 30 Days',
      },
      {
        id: 2,
        name: 'Last 3 Months',
      },
      {
        id: 3,
        name: 'Last 6 Months',
      },
      {
        id: 4,
        name: 'Last 12 Months',
      },
    ],
  },
};


export const UpcomingPaymentsData:{
  id: number;
  overdueDate: string;
  chequeNumber: number;
  contractName: string;
  dueDate: string;
  subtitle: string;
  title: string;
  paymentAmount: number;
  status: 'pending' | 'success' | 'due' | 'overdue';
}[] = [
  {
    id: 1,
    title: "Rent Payment (1/4)",
    chequeNumber: 2444,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #2444 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"overdue",
  },
  {
    id: 2,
    title: "Rent Payment (2/4)",
    chequeNumber: 2485,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #2485 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"due",
  },
  {
    id: 3,
    title: "Rent Payment (3/4)",
    chequeNumber: 2445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #2444 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"pending",
  },
  {
    id: 4,
    title: "Rent Payment (4/4)",
    chequeNumber: 6445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #6445 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"pending",
  },
  {
    id: 5,
    title: "Rent Payment (4/4)",
    chequeNumber: 6445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #6445 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"pending",
  },
  {
    id: 6,
    title: "Rent Payment (4/4)",
    chequeNumber: 6445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #6445 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"pending",
  },
  {
    id: 7,
    title: "Rent Payment (4/4)",
    chequeNumber: 6445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #6445 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"pending",
  },
]

export const AllTransactionsData:{
  id: number;
  overdueDate: string;
  chequeNumber: number;
  contractName: string;
  dueDate: string;
  subtitle: string;
  title: string;
  paymentAmount: number;
  status: 'pending' | 'success' | 'due' | 'overdue';
}[] = [
  {
    id: 1,
    title: "Rent Payment (1/4)",
    chequeNumber: 2444,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #2444 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"overdue",
  },
  {
    id: 2,
    title: "Rent Payment (2/4)",
    chequeNumber: 2485,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #2485 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"due",
  },
  {
    id: 3,
    title: "Rent Payment (3/4)",
    chequeNumber: 2445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #2444 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"success",
  },
  {
    id: 4,
    title: "Rent Payment (6/4)",
    chequeNumber: 1445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #6445 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"success",
  },
  {
    id: 5,
    title: "Rent Payment (6/4)",
    chequeNumber: 1445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #6445 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"success",
  },
  {
    id: 6,
    title: "Rent Payment (6/4)",
    chequeNumber: 1445,
    contractName: 'A10ZBB2 (Al Safa Villa #303)',
    subtitle: "CHQ #6445 | H-Residence - Apartment 303",
    paymentAmount: 25000,
    dueDate:"24 Jan 2022",
    overdueDate:"31 Jan 2022",
    status:"success",
  },
]


//VehiclesData
export const VehiclesData = [
  {
    id: '1',
    name: 'Ford Fusion (A10083)',
    address: 'Added',
    latestTimestamp: '21 Feb 2023',
  },
  {
    id: '2',
    name: 'Masearati Ghibli (A420)',
    address: 'Added',
    latestTimestamp: ' 21 Feb 2023',
  },
];

export const VehiclesRenewData = [
  {
    name: 'Ford Fusion (A10083)',
    address: 'Added',
    latestTimestamp: '21 Feb 2023',
  },
  {
    name: 'Masearati Ghibli (A420)',
    address: 'Added',
    latestTimestamp: ' 21 Feb 2023',
  },
];

//ParkingSpaceData
export const ParkingSpaceData = [
  {
    id: '1',
    name: 'Space #303-1',
    status: 'Active',
    included: 'Included in contract',
  },
  {
    id: '2',
    name: 'Space #303-2',
    status: 'Active',
    included: 'Included in contract',
  },
];

//ParkingSpaceDrawerData
export const ContractData = [
  {
    name: 'Valid till:',
    idNo: '25 Aug 2022',
  },
  {
    name: 'Parking Space:',
    idNo: 'AED 340,000',
  },
];

export const LeaseContractData = [
  {
    name: 'Contract:',
    idNo: 'A10ZBB2 ',
  },
  {
    name: 'Property',
    idNo: '(Al Safa Villa #303)',
  },
  {
    name: 'Started On:',
    idNo: '24 January 2021',
  },
  {
    name: 'Ends On:',
    idNo: '24 January 2022',
  },
  
];

//ContractRenewalData
export const DetailsData = [
  {
    name: 'Term Length: ',
    idNo: '13 months',
  },
  {
    name: 'Term Length:',
    idNo: '4',
  },
  {
    name: 'Total Rent: ',
    idNo: '135,000AED',
  },
  {
    name: 'Booking Deposit:',
    idNo: ' 6,785AED',
  },
];

export const ContractRenewData = [
  {
    name: 'Contract expires: ',
    idNo: '24 Aug 2021',
  },
  {
    name: 'Upcoming payment:',
    idNo: '24 Sep 2022',
  },
];

//AddNewParkingSpaceData
export const AddNewParkingSpaceData = [
  {
    name: 'Parking Space:',
    idNo: 'NA',
  },
  {
    name: 'Valid till:',
    idNo: '06 Oct 2022',
  },
];

//residenceData
export const residenceData = {
  name: 'H-Residence - Apartment #',
  array: [
    {
      id: '1',
      title: 'NOC Request',
      type: 'NOC',
      status: 'Processing',
      date: '04 March 2021',
      data: [
        { type: 'File', value: '793857230-NOC.pdf' },
        { type:'Contract', value : 'A10ZBB2' },
        { type: 'Property', value: 'Al Safa Villa #303' },
        { type: 'Requested On', value: '24 January 2022' },
      ]
    },
    {
      id: '2',
      title: 'Change Payment Request',
      type: 'Change Payment',
      status: 'Failed',
      date: '04 March 2021',
      data: [
         { type: 'Contract', value: 'A10ZBB2 (Al Safa Villa #303)' },
        { type: 'Amount', value: '25,000 AED' },
        { type: 'Cheque Date', value: '24 January 2022' },
        { type: 'Cheque #', value: '2445' },
        { type: 'Reason', value: '[XYZ Reason]' },
      ]
    },
    {
      id: '3',
      title: 'Maintenance Request',
      type: 'Maintenance',
      status: 'Completed',
      date: '04 March 2021',
      data : [
        { type:'Contract', value : '1049A394JL00122' },
        { type: 'For Property', value: 'Al Safa Villa #303' },
        { type: 'Issue Type', value: 'General Maintenance' },
        { type: 'Description', value: 'There is a ghost in my bathroom.' },
        { type: 'Completed On', value: 'Tuesdat, 24th Mar 2022' },
        { type: 'Reason', value: 'Your contract has gone past due on 2 of the 4 cheques on your previous contract. We suggest you to contact our leasing team to discuss more options for this new contract.' },
        { type: 'Document', value: 'Bathroom.JPG' },
      ]
    },
    {
      id: '4',
      title: 'Amenity Booking',
      type: 'Amenity',
      status: 'Awaiting Payment',
      date: '04 March 2021',
      data: [
        { type: 'Amenity', value: 'Event Room' }, 
        { type: 'Date', value: '24 December 2021' },
        { type: 'Time', value: '9 AM' },
        { type: 'Guest', value: '3 Guests' },
        { type: 'Duration', value: '5 Hours' },      
        { type: 'amount', value: '149 AED' }
      ]
    },
    {
      id: '5',
      title: 'Courier Request',
      type: 'Courier',
      status: 'Scheduled',
      date: '04 March 2021',
      data : [
        { type: 'Pickup Date', value: '21 March 2022' },
        { type: 'Time', value: 'Between 12 pm to 5 pm' },
      ]
    },
    {
      id: '6',
      title: 'Move In Request',
      type: 'Move In',
      status: 'Scheduled',
      date: '04 March 2021',
      data: [
        { type: 'Info', value: '24 May 2022 at 10:00am' },
        { type: 'Name', value: 'Michael Stevenson' },
        { type: 'Number', value: '+971 055 552 0212' },
        { type: 'No. of Occupants', value: '1' },
        { type: 'Contract', value: 'A10ZBB2 ' },
        { type: 'Property', value: '(Al Safa Villa #303)' }
      ]
    },
    {
      id: '7',
      title: 'PDC Deferment Request',
      type: 'PDC Deferment',
      status: 'Denied',
      date: '04 March 2021',
      data: [
        { type: 'Contract', value: 'A10ZBB2 (Al Safa Villa #303)' },
        { type: 'Amount', value: '25,000 AED' },
        { type: 'Cheque Date', value: '24 January 2022' },
        { type: 'Cheque #', value: '2445' },
        { type: 'Reason', value: '[XYZ Reason]' }
      ]
    },
    {
      id: '8',
      title: 'Contract Renewal',
      type: 'Contract Renewal',
      status: 'Completed',
      date: '04 March 2021',
      data: [
        { type: 'Requested On', value: '24 Dec 2021' },
        { type: 'Contract', value: 'A10ZBB2' },
        { type: 'Property', value: '(Al Safa Villa #303)' },
        { type: 'Rent (yearly)', value: ' 135,000AED' },
        { type: 'Starting On', value: '22nd May 2022' },
        { type: 'Date', value: '04 March 2022' },
      ]
    },
    {
      id: '9',
      title: 'Parking Space',
      type: 'Parking',
      status: 'Denied',
      date: '04 March 2021',
      data: [ 
      ]
    },
    {
      id: '10',
      title: 'Move Out Request',
      type: 'Move Out',
      status: 'Scheduled',
      date: '04 March 2021',
      data: [
        { type: 'Info', value: '24 May 2022 at 10:00am' },
        { type: 'Name', value: 'Michael Stevenson' },
        { type: 'Number', value: '+971 055 552 0212' },
        { type: 'No. of Occupants', value: '1' },
        { type: 'Contract', value: 'A10ZBB2 ' },
        { type: 'Property', value: '(Al Safa Villa #303)' },
        { type: 'File', value: '220405-A313449-NOC.pdf' }
      ]
    },
    {
      id: '11',
      title: 'Key Handover Request',
      type: 'Key Handover',
      status: 'Completed',
      date: '04 March 2021',
      data: [
        { type: 'Date', value: '24/06/2022' },
        { type: 'Contract', value: 'A10ZBB2 ' },
        { type: 'Property', value: '(Al Safa Villa #303)' },
        { type: 'File', value: 'Move-Out Inspection Report.pdf' }
      ]
    },
    {
      id: '12',
      title: 'Visitor',
      type: 'Visitor',
      status: 'Active',
      date: '04 March 2021',
      data: [
        
      ]
    },
    {
      id: '13',
      title: 'Move In Request',
      type: 'Move In',
      status: 'Completed',
      date: '04 March 2021',
      data: [
        { type: 'Info', value: '24 May 2022 at 10:00am' },
        { type: 'Date', value: '24/06/2022' },
        { type: 'Contract', value: 'A10ZBB2 ' },
        { type: 'Property', value: '(Al Safa Villa #303)' },
        { type: 'File', value: 'Move In_NOC.pdf' }     
      ]
    },
    {
      id: '14',
      title: 'Courier Request',
      type: 'Courier',
      status: 'Completed',
      date: '04 March 2021',
      data : [
        { type: 'Pickup Completed on', value: '21 Mar 2022 at 12: 13 PM' }
      ]
    },
    {
      id: '15',
      title: 'Move Out Request',
      type: 'Move Out',
      status: 'Completed',
      date: '04 March 2021',
      data: [
        { type: 'Info', value: '24 May 2022 at 10:00am' },
        { type: 'Date', value: '24/06/2022' },
        { type: 'Contract', value: 'A10ZBB2 ' },
        { type: 'Property', value: '(Al Safa Villa #303)' },
        { type: 'File', value: 'Move_Out_NOC' }     
      ]
    },
    {
      id: '16',
      title: 'Key Handover Request',
      type: 'Key Handover',
      status: 'Scheduled',
      date: '04 March 2021',
      data: [
        { type: 'Info', value: '24 May 2022 at 10:00am' },
        { type: 'File', value: 'Move-Out Inspection Report.pdf' }
      ]
    },
  ],
};


export const ContractData1 = [
  {
    name: 'Contract Number',
    idNo: 'A9488HD39001',
  },
  {
    name: 'Contact Amount',
    idNo: 'AED 340,000',
  },
  {
    name: 'Lease Term',
    idNo: '12 Months',
  },
  {
    name: 'Start Date',
    idNo: '24 January 2021',
  },
  {
    name: 'End Date',
    idNo: '24 January 2022',
  },
  {
    name: 'Contract Status',
    idNo: 'Active',
  },
];


export const DocumentsData = [
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
  {
    documentType: 'EJARI (0120180802002397)',
    address: 'Al Safa Villa #303',
    fileName: 'ejari.pdf',
    latestTimestamp: '01 Jul 2022',
  },
];



export const documentData = {
  personalData: [{ id: '1', documentType: 'Visa Page' }],
  corporateData: [
    {
      id: '2',
      documentType: ' Company Trade License',
    },
    {
      id: '3',
      documentType: 'NOC',
    },
    {
      id: '4',
      documentType: 'Signatory Power af Attorney',
    },
  ],
};


export const ChatSuggestions = [
  { id: 1, name: 'Maintainance' },
  { id: 2, name: 'Recent Services' },
];

//PlaceData
export const PlaceData = [
  { name: 'Restaurant  9 KMs' },
  { name: 'Museum  3 KMs' },
  { name: 'Airport  4 KMs' },
  { name: 'Beach 1.2KMs' },
  { name: 'Mall  2 KMs' },
];

//roomData
export const FilterTypesRoom = {
  
  type: {
    name: 'Time',
    currId: 1,
    values: [
      {
        id: 1,
        name: '1 Bedroom',
      },
      {
        id: 2,
        name: '2 Bedroom',
      },
      {
        id: 3,
        name: '3 Bedroom',
      },
      {
        id: 4,
        name: '4 Bedroom',
      },
    ],
  },
};