import { navigate } from "raviger";
import React, { useContext, useEffect, useState } from "react";
import { request } from "../api/request";
import { Errors, Login } from "../types/api.action";
import { globalContext } from "../utils/currentUser.context";

const initialState = {
  username: "",
  password: "",
  failedError: "",
};

const validator = (form: Login) => {
  const errors: Errors<Login> = {};
  if (form.username.length < 1) {
    errors.username = "Username is required";
  }
  if (form.password.length < 1) {
    errors.password = "Password is required";
  }

  if (form.password.length > 0 && form.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  }

  return errors;
};
const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<ReturnType<typeof validator>>({});

  useEffect(() => {
    const tId = setTimeout(() => {
      setErrors(validator(form));
    }, 100);

    return () => {
      clearTimeout(tId);
    };
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(errors).every((i) => !i)) {
      // Basic Auth Credentials
      try {
        const { failedError, ...payload } = form;
        const { token } = await request("/auth-token/", "POST", payload);
        localStorage.setItem("TOKEN", token);

        navigate("/");
      } catch (error) {
        setForm((prev) => ({ ...prev, failedError: "⚠️ Try Again" }));
      }
    }
  };

  const handleFieldChange = function <T>(name: string, value: T) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      failedError: "",
    }));
  };

  return (
    <>
      {form.failedError && (
        <div className="bg-red-900 p-2 rounded mb-4 bg-opacity-50">
          {form.failedError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="is_public" className="inline-block mb-1">
          Username *
        </label>
        <input
          type="text"
          className="input w-full mb-2"
          name="username"
          value={form.username}
          required
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
        />
        {errors.username && <p className="text-red-400">{errors.username}</p>}
        <br />
        <label htmlFor="is_public" className="inline-block mb-1">
          Password *
        </label>
        <input
          type="password"
          className="input w-full mb-2"
          name="password"
          value={form.password}
          required
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
        />
        {errors.password && <p className="text-red-400">{errors.password}</p>}

        <button type="submit" className="btn w-full mt-8">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
