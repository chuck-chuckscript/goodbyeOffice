import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

export const useFetchDataChanging = (apiFunction, dataUser) => {
  const toast = useToast();  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);  
  

  useEffect(() => {
    (
        async function(){
            setLoading(true);
            try{
                let response;
                dataUser ? response = await apiFunction(dataUser) : response = await apiFunction(); 

                
                // console.log(response)
                if(response.status !== 200){

                    let message = response.response.data?.message;
                    
                    if(response.status === 500){
                      message = 'Ошибка подключения. Обратитесь в техническую поддержку';
                    }

                    throw new Error(message);
                }

                if(response.data){
                    const dataResponse = response.data;

                    setData(dataResponse);

                    
                }
                

              }
              catch(e){
                setData(null);
  
                toast({
                    title: 'Ошибка',
                    description: e.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
              }
            setLoading(false);
        }
    )()

  }, [apiFunction])
     
  return [data, loading, setData]
}
