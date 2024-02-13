import { residenceData } from 'src/utils/constant';
import RequestList from 'src/pages/RequestList';

export default function IndividualPropertiesRequestList() {
  return <RequestList propertyTitle={residenceData.name} />;
}
