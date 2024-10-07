import DeviceInfo from 'react-native-device-info';


export const getDeviceId = async () => {
    try {
        const uniqueId = await DeviceInfo.getUniqueId();
        // console.log("uniqueId==>", uniqueId)
        return uniqueId;
    } catch (error) {
        console.log("Error getting device id: ", error);
        throw error;
    }
}