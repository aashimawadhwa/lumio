import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="auth/login" replace />,
    },
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <LoginView />,
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />,
        },
        {
          path: 'create-new-password',
          element: <CreateNewPassword />,
        },
        { path: 'change-password', element: <ChangePassword /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/menu" replace />, index: true },
        { path: 'menu', element: <Menu /> },
        { path: 'explore', element: <Explore /> },
        { path: 'amenities', element: <Amenities /> },
        { path: 'payments', element: <Payment /> },
        { path: 'request-list', element: <RequestList /> },
        { path: 'all-request-list', element: <AllRequestList /> },
        { path: 'inbox', element: <Inbox /> },
        { path: 'courier-request', element: <CourierRequest /> },
        { path: 'explore-property', element: <ExploreProperty /> },

        { path: 'maintenance-request', element: <MaintenanceRequest /> },
        { path: 'contract-renewal', element: <ContractRenewal /> },
        { path: 'move-in', element: <MoveIn /> },
        { path: 'move-out', element: <MoveOut /> },
        { path: 'key-handover', element: <KeyHandover /> },
        { path: 'explore-book-amenity', element: <ExploreBookAmenity /> },
        { path: 'parking', element: <Parking /> },
        { path: 'add-vehicle', element: <AddVehicle /> },
        { path: 'add-parking-space', element: <ParkingSpace /> },
        { path: 'chat_to_conceirge', element: <ChatToConcierge /> },
        { path: 'reschedule', element: <Reschedule /> },
        {
          path: 'profile',
          children: [
            {
              element: <Navigate to="/dashboard/profile/user-profile" replace />,
              index: true,
            },
            { path: 'user-profile', element: <ProfilePage /> },
            { path: 'edit-profile', element: <EditProfile /> },
            { path: 'my-documents', element: <Documents /> },
            { path: 'add-documents', element: <AddDocuments /> },
            { path: 'bank-account-form', element: <BankAccountForm /> },
            { path: 'my-properties', element: <MyProperties /> },
            { path: 'property', element: <Properties /> },
            { path: 'visitors', element: <Visitors /> },
            { path: 'add-visitor', element: <AddVisitor /> },
            { path: 'all-payments', element: <AllPayments /> },
            { path: 'edit-occupants', element: <EditOccupants /> },
            { path: 'occupants', element: <Occupants /> },
            { path: 'new-request', element: <NewRequest /> },
            { path: 'noc-request', element: <NocRequest /> },
          ],
        },
      ],
    },
    {
      path: '*',
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

//Auth
const LoginView = Loadable(lazy(() => import('src/components/auth/LoginView')));
const ForgotPassword = Loadable(lazy(() => import('src/components/auth/ForgotPassword')));
const CreateNewPassword = Loadable(lazy(() => import('src/components/auth/NewPassword')));
const ChangePassword = Loadable(lazy(() => import('src/components/auth/ChangePassword')));

// Dashboard
const Menu = Loadable(lazy(() => import('src/pages/Menu')));
const Parking = Loadable(lazy(() => import('src/components/pages/parking/ParkingPage')));
const Occupants = Loadable(lazy(() => import('src/components/pages/properties/Occupants')));
const EditOccupants = Loadable(lazy(() => import('src/components/pages/properties/EditOccupants')));
const NotFound = Loadable(lazy(() => import('src/pages/Page404')));
const ProfilePage = Loadable(lazy(() => import('src/pages/Profilepage')));
const EditProfile = Loadable(lazy(() => import('src/components/pages/profile/EditProfile')));
const BankAccountForm = Loadable(
  lazy(() => import('src/components/pages/profile/BankAccountForm'))
);

const Documents = Loadable(lazy(() => import('src/components/pages/document/Document')));
const AddDocuments = Loadable(lazy(() => import('src/components/pages/document/AddDocuments')));

const MyProperties = Loadable(lazy(() => import('src/pages/MyProperties')));
const Properties = Loadable(lazy(() => import('src/components/pages/properties/Properties')));
const ExploreProperty = Loadable(
  lazy(() => import('src/components/pages/explore/ExploreProperty'))
);

const Inbox = Loadable(lazy(() => import('src/pages/Inbox')));
const NewRequest = Loadable(lazy(() => import('src/pages/NewRequest')));
const NocRequest = Loadable(lazy(() => import('src/pages/NocRequest')));
const RequestList = Loadable(lazy(() => import('src/pages/IndividualPropertiesRequestList')));
const AllRequestList = Loadable(lazy(() => import('src/pages/AllPropertiesRequestList')));
const AllPayments = Loadable(lazy(() => import('src/pages/AllPropertiesPayment')));
const Payment = Loadable(lazy(() => import('src/pages/IndividualPropertiesPayment')));
const ContractRenewal = Loadable(
  lazy(() => import('src/components/pages/properties/ContractRenew'))
);

const Amenities = Loadable(lazy(() => import('src/pages/Amenities')));
const Explore = Loadable(lazy(() => import('src/pages/Explore')));
const Visitors = Loadable(lazy(() => import('src/pages/Visitors')));
const AddVisitor = Loadable(lazy(() => import('src/components/pages/visitor/AddVisitor')));
const MaintenanceRequest = Loadable(lazy(() => import('src/pages/MaintenanceRequest')));
const AddVehicle = Loadable(lazy(() => import('src/components/pages/parking/AddVehicles')));
const ParkingSpace = Loadable(
  lazy(() => import('src/components/pages/parking/ParkingSpaceRequestPage'))
);
const MoveIn = Loadable(lazy(() => import('src/components/pages/request/MoveIn')));
const MoveOut = Loadable(lazy(() => import('src/components/pages/request/MoveOut')));
const KeyHandover = Loadable(lazy(() => import('src/components/pages/request/KeyHandover')));
const ExploreBookAmenity = Loadable(lazy(() => import('src/pages/ExploreBookAmenity')));
const CourierRequest = Loadable(lazy(() => import('src/pages/CourierRequest')));
const ChatToConcierge = Loadable(lazy(() => import('src/pages/ChatToConcierge')));
const Reschedule = Loadable(lazy(() => import('src/components/amenities/RescheduleAmenities')))
