import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import urlRegex from 'url-regex';
export default class toProfileCard extends React.Component {
  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      dataJSON: {
        card_data: {},
        configs: {}
      },
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
          dataJSON: {
            card_data: card.data,
            configs: opt_config.data
          },
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
    window.open(this.state.dataJSON.card_data.data.url,'_top');
  }

  renderSevenCol(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.card_data.data;
      return(
        <div className="col-7 to-profile-card">
          <div className="profile-card-title">
            {data.title}
          </div>
          <div className="image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "profile-detail" key={i}>
                    <div className = "detail-key">{data.key}</div>
                    <div className = "detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  renderFourCol(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.card_data.data;
      return(
        <div className="col-4 to-profile-card">
          <div className="profile-card-title">
            {data.title}
          </div>
          <div className="image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "profile-detail" key={i}>
                    <div className = "detail-key">{data.key}</div>
                    <div className = "detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  renderThreeCol(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.card_data.data;
      return(
        <div className="col-3 to-profile-card">
          <div className="profile-card-title">
            {data.title}
          </div>
          <div className="image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "profile-detail" key={i}>
                    <div className = "detail-key">{data.key}</div>
                    <div className = "detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }

  renderTwoCol(){
    if(!this.state.schemaJSON){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.card_data.data;
      return(
        <div className="col-2 to-profile-card">
          <div className="profile-card-title">
            {data.title}
          </div>
          <div className="image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p>{data.description}</p>
          <div className="profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "profile-detail" key={i}>
                    <div className = "detail-key">{data.key}</div>
                    <div className = "detail-value">{data.value.match(urlRegex()) ?<a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
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
        return this.renderSevenCol();
      case '4_col':
        return this.renderFourCol();
      case '3_col':
        return this.renderThreeCol();
      case '2_col':
        return this.renderTwoCol();
    }
  }
}