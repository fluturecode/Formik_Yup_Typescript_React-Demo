import Button from "@material-ui/core/Button"
import { Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import FormikField from "../FormikField"
import "./App.css"

interface FormValues {
	name: string
	email: string
	password: string
}

const initialValues: FormValues = {
	name: "",
	email: "",
	password: "",
}

// Mock api email list of existing users
const emailAddresses = ["test1@gmail.com", "test2@gmail.com", "test3@gmail.com"]

const lowercaseRegex = /(?=.*[a-z])/
const uppercaseRegex = /(?=.*[A-Z])/
const numericRegex = /(?=.*[0-9])/
const specialCharRegex = /(?=.*\W)/

const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Name is required.")
		.required("Name is required."),
	email: Yup.string()
		.lowercase()
		.email("Must be a valid email.")
		.notOneOf(emailAddresses, "Email already taken.")
		.required("Email is required."),
	password: Yup.string()
		// Must contain at least 1 uppercase character
		.matches(uppercaseRegex, "One upper case character required.")
		// Must contain at least 1 lowercase character
		.matches(lowercaseRegex, "One lower case character required.")
		// Must contain at least 1 numeric character
		.matches(numericRegex, "One number is required.")
		// Must contain at least 1 special character
		.matches(specialCharRegex, "One special character is required.")
		.min(8, "Minimum 8 character required.")
		.required("Password is required."),
})

const App: React.FC = () => {
	const handleSubmit = (values: FormValues): void => {
		alert(JSON.stringify(values))
	}

	return (
		<div className='App'>
			<h1>Sign Up</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={SignupSchema}>
				{({ dirty, isValid }) => {
					return (
						<Form>
							<FormikField name='name' label='Name' required />
							<FormikField name='email' label='Email' required />
							<FormikField
								name='password'
								label='Password'
								required
								type='password'
							/>
							<Button
								variant='contained'
								color='primary'
								disabled={!dirty || !isValid}
								type='submit'>
								Primary
							</Button>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default App
