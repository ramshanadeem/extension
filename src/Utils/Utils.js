import { ethers } from "ethers";
export const decrypt=async(data,hashedpassword)=>{
    console.log('DECRYPT=============',data,hashedpassword)
    let decryptedData= await ethers.Wallet.fromEncryptedJson(data,hashedpassword)
    console.log('DECRYPTED============',decryptedData)
    return decryptedData;
}