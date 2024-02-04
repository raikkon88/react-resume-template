import React, { Component } from 'react'
import ReactGA from 'react-ga'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import About from './Components/About'
import Resume from './Components/Resume'
import Testimonials from './Components/Testimonials'
import Portfolio from './Components/Portfolio'
import { Amplify } from 'aws-amplify'
import { get } from 'aws-amplify/api'

const amplifyConfig = {
    aws_project_region: process.env.REACT_APP_AWS_REGION,
    aws_cloud_logic_custom: [
        {
            name: process.env.REACT_APP_AWS_AMPLIFY_API_NAME,
            endpoint: process.env.REACT_APP_AWS_AMPLIFY_API_URL,
            region: process.env.REACT_APP_AWS_REGION,
        },
    ],
}

Amplify.configure(amplifyConfig)

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foo: 'bar',
            resumeData: {},
        }

        ReactGA.initialize('UA-110570651-1')
        ReactGA.pageview(window.location.pathname)
    }

    async getResumeData() {
        const restOperation = get({
            apiName: 'curriculumData',
            path: '/data',
        })
        const { body } = await restOperation.response
        const response = await body.json()
        this.setState({ resumeData: response })
    }

    componentDidMount() {
        this.getResumeData()
    }

    render() {
        return (
            <div className="App">
                <Header data={this.state.resumeData.main} />
                <About data={this.state.resumeData.main} />
                <Resume data={this.state.resumeData.resume} />
                <Testimonials data={this.state.resumeData.testimonials} />
                <Portfolio data={this.state.resumeData.portfolio} />
                <Footer data={this.state.resumeData.main} />
            </div>
        )
    }
}

export default App
