import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import urlRegex from 'url-regex';
export default class toProfileCard extends React.Component {
  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      dataJSON: undefined,
      schemaJSON: undefined,
      domain: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.schemaJSON) {
      stateVar.schemaJSON = this.props.schemaJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    if(this.props.domain){
      stateVar.domain = this.props.domain;
    }

    this.state = stateVar;
  }

  componentDidMount() {
    if (this.state.fetchingData){
      axios.all([
        axios.get(this.props.dataURL),
        axios.get(this.props.schemaURL),
        axios.get(this.props.optionalConfigURL),
        axios.get(this.props.optionalConfigSchemaURL),
        axios.get(this.props.siteConfigURL)
      ]).then(axios.spread((card, schema, opt_config, opt_config_schema, site_configs) => {
        let stateVar = {
          fetchingData: false,
          dataJSON: card.data,
          schemaJSON: schema.data,
          optionalConfigJSON: opt_config.data,
          optionalConfigSchemaJSON: opt_config_schema.data,
          siteConfigs: site_configs.data
        };

        stateVar.optionalConfigJSON.house_colour = stateVar.siteConfigs.house_colour;
        stateVar.optionalConfigJSON.reverse_house_colour = stateVar.siteConfigs.reverse_house_colour;
        stateVar.optionalConfigJSON.font_colour = stateVar.siteConfigs.font_colour;
        stateVar.optionalConfigJSON.reverse_font_colour = stateVar.siteConfigs.reverse_font_colour;
        this.setState(stateVar);
      }));
    } else {
      this.componentDidUpdate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dataJSON) {
      this.setState({
        dataJSON: nextProps.dataJSON
      });
    }
  }

  componentDidUpdate() {

  }

  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  handleClick(){
    window.open(this.state.dataJSON.data.url,'_top');
  }

  renderCol7(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.data;
      console.log(data);
      return(
        <div className="col-7 proto-to-profile-card">
          <div className="proto-profile-card-title">
            {data.title}
          </div>
          <div className="proto-image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  renderCol4(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.data;
      return(
        <div className="col-4 proto-to-profile-card">
          <div className="proto-profile-card-title">
            {data.title}
          </div>
          <div className="proto-image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  renderCol3(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.data;
      return(
        <div className="col-3 proto-to-profile-card">
          <div className="proto-profile-card-title">
            {data.title}
          </div>
          <div className="proto-image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  renderCol2(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.data;
      return(
        <div className="col-2 proto-to-profile-card">
          <div className="proto-profile-card-title">
            {data.title}
          </div>
          <div className="proto-image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
  render() {
    switch(this.props.mode) {
      case '7_col':
        return this.renderCol7();
      case '4_col':
        return this.renderCol4();
      case '3_col':
        return this.renderCol3();
      case '2_col':
        return this.renderCol2();
    }
  }
}