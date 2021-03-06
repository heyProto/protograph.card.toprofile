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
      optionalConfigJSON: {},
      readMoreEnabled: false,
      siteConfigs: this.props.siteConfigs
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    this.state = stateVar;
  }

  componentDidMount() {
    if (this.state.fetchingData){
      let items_to_fetch = [
        axios.get(this.props.dataURL)
      ];

      if (this.props.siteConfigURL) {
        items_to_fetch.push(axios.get(this.props.siteConfigURL));
      }

      axios.all(items_to_fetch).then(axios.spread((card, site_configs) => {
        let stateVar = {
          fetchingData: false,
          dataJSON: card.data,
          optionalConfigJSON: {},
          siteConfigs: site_configs ? site_configs.data : this.state.siteConfigs
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
    if (!this.props.readMoreEnabled) {
      let elem = document.querySelector('.proto-exp-text')
      this.multiLineTruncate(elem)
    }
  }

  multiLineTruncate(el) {
    let data = this.state.dataJSON.data,
      wordArray = data.description.split(' '),
      props = this.props;
    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...' + '<br><button id="read-more-button" class="protograph-read-more" >more</button>';
    }
    if (document.getElementById('read-more-button') !== null) {
      document.getElementById('read-more-button').addEventListener('click', function () {
        document.getElementById('read-more-button').style.display = 'none'
        document.querySelector('.proto-exp-text').style.maxHeight = 'none';
        document.querySelector('.proto-exp-text').style.marginBottom = '10px';
        document.querySelector('.proto-exp-text').innerHTML = data.description;
        if (typeof props.clickCallback === 'function') {
          props.clickCallback();
        }
      })
    }
  }
  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  handleClick(){
    window.open(this.state.dataJSON.data.url,'_top');
  }

  renderCol7(){
    if(this.state.fetchingData){
      return(
        <div>Loading</div>
      )
    }else{
      let data = this.state.dataJSON.data;
      return(
        <div className="col-7 proto-to-profile-card">
          <div className="proto-profile-card-title">
            {data.title}
          </div>
          <div className="proto-image-area">
            {data.image_url && <img src={data.image_url}/>}
          </div>
          <p className="proto-exp-text">{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{(data.value.match(urlRegex()) && (data.value.split('http://').length > 1 || data.value.split('https://').length > 1)) ? <a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
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
    if (this.state.fetchingData){
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
          <p className="proto-exp-text">{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{(data.value.match(urlRegex()) && (data.value.split('http://').length > 1 || data.value.split('https://').length > 1)) ? <a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
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
    if (this.state.fetchingData){
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
          <p className="proto-exp-text">{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{(data.value.match(urlRegex()) && (data.value.split('http://').length > 1 || data.value.split('https://').length > 1)) ? <a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
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
    if (this.state.fetchingData){
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
          <p className="proto-exp-text">{data.description}</p>
          <div className="proto-profile-details">
            {
              data.details.map((data,i)=>{
                return(
                  <div className = "proto-profile-details" key={i}>
                    <div className = "proto-detail-key">{data.key}</div>
                    <div className = "proto-detail-value">{(data.value.match(urlRegex()) && (data.value.split('http://').length > 1 || data.value.split('https://').length > 1)) ? <a target="_blank" href={data.value}>{data.value}</a> : data.value}</div>
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
      case 'col7':
        return this.renderCol7();
      case 'col4':
        return this.renderCol4();
      case 'col3':
        return this.renderCol3();
      case 'col2':
        return this.renderCol2();
    }
  }
}