import { useState } from "react";
import { useForm } from "react-hook-form";
function App() {
  const [login, setLogin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit"
  });
  const post = async(data) => {
    const response = await fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await response.json();
  }
  const onSubmit = () => {
    const data = {
      login: login,
      firstName: firstName,
      lastName: lastName
    };
    post(data);
    setLogin('');
    setFirstName('');
    setLastName('');
    reset({login: "", firstName: "", lastName: ""});
  };
  return (
    <div className="App">
      <h1>React Hook Form for IPZ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label>
          Login:
          <input
            {...register("login", {
              required: "Поле обов'язкове для заповнення!",
              pattern: {
                value: /[a-zA-Z]/,
                message: "русский военный корабль иди..."
              },
            })}
            value={login}
            onChange={e=>setLogin(e.target.value)}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors?.login && (
            <p> {errors?.login?.message || "Error!"} </p>
          )}
        </div>
      <label>
          FirstName:
          <input
            {...register("firstName", {
              required: "Поле обов'язкове для заповнення!",
              minLength: {
                value: 5,
                message: "Мінімальне значення 5"
              }
            })}
            value={firstName}
            onChange={e=>setFirstName(e.target.value)}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors?.firstName && (
            <p> {errors?.firstName?.message || "Error!"} </p>
          )}
        </div>
        <label>
          LastName:
          <input
            {...register("lastName", {
              required: "Поле обов'язкове для заповнення!",
              minLength: {
                value: 5,
                message: "Мінімальне значення 5",
              },
              maxLength: {
                value: 25,
                message: "Максимальне значення 25"
              }
            })}
            value={lastName}
            onChange={e=>setLastName(e.target.value)}
          />
        </label>
        <div style={{ height: 40 }}>
          {errors?.lastName && (
            <p> {errors?.lastName?.message || "Error!"} </p>
          )}
        </div>



        <input type="submit" />
      </form>
    </div>
  );
}

export default App;