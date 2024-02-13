function path(root: string, sublink: string) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_MAIN = '/dashboard/';
  const ROOTS_MAIN_PROFILE = '/dashboard/profile/';

  const ROOTS_AUTH = '/auth';
  
  export const PATH_MAIN = {
    root: ROOTS_MAIN,
    dashboard: path(ROOTS_MAIN, 'menu'),
    explore:path(ROOTS_MAIN, 'explore'),
    amenities: path(ROOTS_MAIN, 'amenities'),
    payment: path(ROOTS_MAIN, 'payments'),
    request: path(ROOTS_MAIN, 'request-list'),
    all_request: path(ROOTS_MAIN, 'all-request-list'),
    explore_property:path(ROOTS_MAIN, 'explore-property'),
    inbox: path(ROOTS_MAIN, 'inbox'),
    contract_renew: path(ROOTS_MAIN, 'contract-renewal'),
    move_in: path(ROOTS_MAIN,'move-in'),
    move_out: path(ROOTS_MAIN,'move-out'),
    key_handover: path(ROOTS_MAIN,'key-handover'),
    parking: path(ROOTS_MAIN, 'parking'),
    add_parking_space: path(ROOTS_MAIN,'add-parking-space'),
    add_vehicle: path(ROOTS_MAIN,'add-vehicle'),
    courier_request:path(ROOTS_MAIN, 'courier-request'),
    reschedule_amenities:path(ROOTS_MAIN, 'reschedule'),


    
    profile: ROOTS_MAIN_PROFILE,
    edit_profile: path(ROOTS_MAIN_PROFILE, 'edit-profile'),
    documents: path(ROOTS_MAIN_PROFILE, 'my-documents'),
    add_documents: path(ROOTS_MAIN_PROFILE, 'add-documents'),
    bank_account_form: path(ROOTS_MAIN_PROFILE, 'bank-account-form'),
    properties: path(ROOTS_MAIN_PROFILE, 'my-properties'),
    edit_documents: path(ROOTS_MAIN_PROFILE, 'edit-documents'),
    noc_request: path(ROOTS_MAIN_PROFILE, 'noc-request'),
    all_payment: path(ROOTS_MAIN_PROFILE, 'all-payments'),
    add_visitor: path(ROOTS_MAIN_PROFILE, 'add-visitor'),
    visitor: path(ROOTS_MAIN_PROFILE, 'visitor'),
    edit_occupants: path(ROOTS_MAIN_PROFILE, 'edit-occupants'),
    occupants: path(ROOTS_MAIN_PROFILE, 'occupants'),
    new_request: path(ROOTS_MAIN_PROFILE,'new-request'),
  };
  
  export const PATH_AUTH = {
    root: ROOTS_AUTH,
    welcome: path(ROOTS_AUTH, '/welcome'),
    login: path(ROOTS_AUTH, '/login'),
    forgot: path(ROOTS_AUTH, '/forgot-password'),
    create_new_password: path(ROOTS_AUTH, '/create_new-password'),
    change_password: path(ROOTS_AUTH, '/change-password')
  };

