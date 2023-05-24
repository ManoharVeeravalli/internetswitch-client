import { UserDetailGuard } from '../lib/guards';
import { useUserDetail } from '../lib/hooks';
import Layout from '../components/Layout';
import DeviceList from '../components/DeviceList';

function DevicesWrapper() {
    const userDetail = useUserDetail();

    return (
        <>
            <Layout Heading={<h1 className='sub-heading'><span className='highlight'>Welcome</span> {userDetail.name}</h1>}>
                <DeviceList />
            </Layout>
        </>

    );
}

const DevicesRoute = UserDetailGuard(DevicesWrapper);

export default DevicesRoute;


