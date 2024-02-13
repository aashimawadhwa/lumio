import SvgIconStyle from 'src/components/SvgIconStyle';
const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 40, height: 40, color: '#CAC9C0' }} />
);

const ICONS = {
  allServices: getIcon('ic_allServices'),
  amenities: getIcon('ic_amenities'),
  payments: getIcon('ic_payments'),
  requests: getIcon('ic_requests'),
  search: getIcon('ic_search'),
  concierge: getIcon('ic_concierge'),
};
export const menuItems = [
  {
    id: 1,
    title: 'Amenities',
    path: '',
    icon: ICONS.amenities,
  },
  {
    id: 2,
    title: 'Payments',
    path: '',
    icon: ICONS.payments,
  },
  {
    id: 3,
    title: 'Requests',
    path: '',
    icon: ICONS.requests,
  },
  {
    id: 4,
    title: 'All Services',
    path: '',
    icon: ICONS.allServices,
  },
  {
    id: 5,
    title: 'Search',
    path: '',
    icon: ICONS.search,
  },

  {
    id: 6,
    title: 'Concierge',
    path: '',
    icon: ICONS.concierge,
  },
];

export const navConfig = [
  {
    subheader: 'management',
    items: [
      {
        title: 'H Residence',
        subtitle: 'Apartment 303',
        path: '/dashboard/menu',
        children: [
          {
            title: 'H Residence',
            subtitle: 'Apartment 303',
            path: '/dashboard/menu',
          },
          {
            title: 'H Fold ',
            subtitle: 'Apartment 304',
            path: '/dashboard/menu',
          },

          {
            title: 'Amenities',
            subtitle: 'Apartment 305',
            path: '/dashboard/menu',
          },
        ],
      },
    ],
  },
];
