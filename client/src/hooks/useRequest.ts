import axios from 'axios';
import { Action } from '../actions/types';
import { useState } from 'react';

type Method = 'get' | 'post';

interface UseRequestProps<T extends Action> {
  url: string;
  method: Method;
  data: T['payload'];
  onSuccess(props: any): void; // to be called with respose.data which is super hard to know in advance
}

function useRequest<T extends Action>({
  url,
  method,
  data,
  onSuccess,
}: UseRequestProps<T>) {
  const [errors, setErrors] = useState();

  const doRequest = async (props?: {}) => {
    try {
      const response = await axios({ method, url, data });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };
  return { doRequest, errors };
}

export { useRequest };
