import { useState, useEffect } from 'react';
import axios from 'axios';
import { visitFunctionBody } from 'typescript';

interface UseRequestProps {
  url: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  body: {};
  onSuccess?(data: {}): void;
}

const useRequest = async ({
  url,
  method,
  body,
  onSuccess,
}: UseRequestProps) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async (props: {}) => {
    try {
      setErrors(null);
      // @ts-ignore
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {}
    return { doRequest, errors };
  };
};
