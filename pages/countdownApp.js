import { useState, useCallback, useEffect, useRef } from 'react';
import { TextField, Heading, TextStyle, Card,TextContainer, Page, ChoiceList, Banner } from '@shopify/polaris';
import React from 'react';
import {BlockPicker} from 'react-color'
import lifecycle from 'react-pure-lifecycle';

import ClickHereImage from '../public/clickHereImage';

let globalSetCountdownIsActive;
let globalSetIsTouchedCallback;

const CountdownApp = (props) => {

  const initialConfig = {
    endTime: new Date().getTime()+1000*60*30,
    startTime: new Date().getTime(),
    sizeSchema: "2",
    positionSchema: 0,
    messageText: "a new special offer!",
    buyNowBtnText: "buy now",
    daysText: "days",
    hoursText: "hours",
    minutesText: "minutes",
    secondsText: "seconds",
    messageTextColor: "yellow",
    buyNowBtnTextColor: "red",
    daysCountTextColor: "red",
    hoursCountTextColor: "red",
    minutesCountTextColor: "red",
    secondsCountTextColor: "red",
    daysLabelTextColor: "red",
    hoursLabelTextColor: "red",
    minutesLabelTextColor: "red",
    secondsLabelTextColor: "red",
    backgroundColor: "red",
    daysBackgroundColor: "yellow",
    hoursBackgroundColor: "yellow",
    minutesBackgroundColor: "yellow",
    secondsBackgroundColor: "yellow",
    buyNowBtnBackgroundColor: "yellow",
    daysBackgroundTemplate: null,
    hoursBackgroundTemplate: null,
    minutesBackgroundTemplate: null,
    secondsBackgroundTemplate: null,
    backgroundTemplate: null,
    buyNowBtnBackgroundTemplate: null,
    countdownIsActive: false
  }
  
    
    //default
    const [config, setConfig] = useState(initialConfig);
    const [isTouchedCallback, setIsTouchedCallback] = useState(props.isTouchedCallback);

    function applyConfigurationForCountdownApp(firebaseResponse){

      let fieldKeys = Object.keys(firebaseResponse.fields);
      let newConfigArrObj = [];
      fieldKeys.forEach(field => {
        newConfigArrObj.push(
            {[field]: Object.values(firebaseResponse.fields[field])[0]}
          )
      });
      const newConfig = (Object.assign({}, config, ...newConfigArrObj));
      
      

      updateStates(newConfig);
      setConfig(newConfig);

    
    }
  

    useEffect(() => {
      let shop = "";
      shop = props.shopOrigin;
      fetch('https://firestore.googleapis.com/v1/projects/i11l-software/databases/(default)/documents/Countdown-Configuration/'+shop)
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            applyConfigurationForCountdownApp(data);
          }
          
        });
    }, []);

    const [touched, setTouched] = useState(false);
    

    const timezoneOffsetInMS = new Date().getTimezoneOffset() * 60 * 1000;

    

    let [endTime, setEndTime] = useState(config.endTime);
    let [endTimeToday, setEndTimeToday] = useState(returnTimeTodayFor(config.endTime) - timezoneOffsetInMS);
    let [startTime, setStartTime] = useState(config.startTime);
    let [startTimeToday, setStartTimeToday] = useState(returnTimeTodayFor(config.startTime) - timezoneOffsetInMS);
    let [diff, setDiff] = useState(endTime - startTime);
    let [days, setDays] = useState(Math.floor(diff / (1000 * 60 * 60 * 24)));
    let [hours, setHours] = useState(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let [minutes, setMinutes] = useState(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    let [seconds, setSeconds] = useState(Math.floor((diff % (1000 * 60)) / 1000));

    function timestampFrom(hourMinuteString){
      const hour = hourMinuteString.slice(0,-3);
      const min = hourMinuteString.slice(-2);
      return hour*60*60*1000 + min*60*1000;
    }
    function returnTimeTodayFor(datetime){
      const dateString = returnStringTimeFrom(datetime);
      const newTS = timestampFrom(dateString);
      return newTS;
      
    }
    function useInterval(callback, delay) {
      const savedCallback = useRef();
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);
      useEffect(() => {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
    }

    useInterval(() => {
      setTime()
    }, 100);



    function setTime(){
      setDiff(endTime - Date.now());    
      if(endTime - Date.now() > 0){
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
      }else{
        setStartTimeToday(returnTimeTodayFor(Date.now()) - timezoneOffsetInMS);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }



    function returnStringTimeFrom(TS){
      
      try {
        TS = parseInt(TS)
        return new Date(TS).toISOString().slice(-13,-8);
      } catch (error) {
        return new Date().toISOString().slice(-13,-8);
      }
      
    }
    function returnStringDateFrom(TS){
      
      try {
        TS = parseInt(TS)
        return new Date(TS).toISOString().split('.')[0].slice(0,-3);
      } catch (error) {
        return new Date().toISOString().split('.')[0].slice(0,-3);
      }
      
    }

    // function applyEndTimeAndSetDate(hourMinuteString){
    //   const endDateTS = (new Date(new Date(endTime).toLocaleDateString())).getTime();
    //   let newEndTimeToday = returnTimeTodayFor(new Date(timestampFrom(hourMinuteString)));
    //   let newEndTimeTS = newEndTimeToday+endDateTS;

    //   setEndTimeToday(newEndTimeToday);
    //   setEndTime(newEndTimeTS);
 
    //   updateConfigurationObject("endTime",newEndTimeTS);
    // }

    // function applyStartTimeAndSetDate(hourMinuteString){
    //   const startDateTS = (new Date(new Date(startTime).toLocaleDateString())).getTime();
    //   let newStartTimeToday = returnTimeTodayFor(new Date(timestampFrom(hourMinuteString)));
    //   let newStartTimeTS = newStartTimeToday+startDateTS;
      
    //   if(endTime < newStartTimeTS){
    //     const newEndTime = returnTimeTodayFor(newStartTimeTS) - timezoneOffsetInMS;
    //     setEndTimeToday(newEndTime);
    //     setEndTime(newStartTimeTS);
    //     updateConfigurationObject("endTime",newEndTime);
    //   }
    //   setStartTime(newStartTimeTS);
    //   setStartTimeToday(newStartTimeToday);
    //   let adjustedStartTime = startTime - (startTime - Date.now());
    //   setDiff(endTime - adjustedStartTime); 
    //   updateConfigurationObject("startTime",newStartTimeTS);
    // }

    const sizeChoices = [
        {label: 'Small', value: "1"},
        {label: 'Normal', value: "2"},
        {label: 'Large', value: "3"}
    ]

    const colorPalette = [
        "#D72C0D", "#006E52", "#00A0AC", "#FFEA8A", "#202223",
        "#FF0000", "#00ff00", "#0000ff", "#ffff00", "#fafafa"
    ]

    function applySizeSchema(selection){
        switch (parseInt(selection)){
            case 1:
                setNumbersCountFont("24px");
                setNumbersLineHeight("33px");
                setLabelFont("14px");
                setMessageFont("18px");
                setMessageLineHeight("78px");
                setBuyNowBtnFont("18px");
                setBuyNowBtnHeight("63px");
                setBuyNowBtnTop("4px");
                break;
            case 2:
                setNumbersCountFont("30px");
                setNumbersLineHeight("42px");
                setLabelFont("16px");
                setMessageFont("18px");
                setMessageLineHeight("86px");
                setBuyNowBtnFont("20px");
                setBuyNowBtnHeight("70px");
                setBuyNowBtnTop("4px");
                break;
            case 3:
                setNumbersCountFont("44px");
                setNumbersLineHeight("62px");
                setLabelFont("18px");
                setMessageFont("22px");
                setMessageLineHeight("107px");
                setBuyNowBtnFont("26px");
                setBuyNowBtnHeight("84px");
                setBuyNowBtnTop("8px");
                break;
            default:
                setNumbersCountFont("30px");
                setNumbersLineHeight("42px");
                setLabelFont("16px");
                setMessageFont("18px");
                setMessageLineHeight("86px");
                setBuyNowBtnFont("20px");
                setBuyNowBtnHeight("70px");
                setBuyNowBtnTop("4px");
        }
    }

    

    const updateConfigurationObject = (key, value) => {
      setTouched(true);
      const newConfiguration = {
        endTime,startTime,sizeSchema,positionSchema,messageText,buyNowBtnText,daysText,
        hoursText,minutesText,secondsText,messageTextColor,buyNowBtnTextColor,
        daysCountTextColor,hoursCountTextColor,minutesCountTextColor,secondsCountTextColor,
        daysLabelTextColor,hoursLabelTextColor,minutesLabelTextColor,secondsLabelTextColor,
        backgroundColor, daysBackgroundColor, hoursBackgroundColor, minutesBackgroundColor, 
        secondsBackgroundColor, buyNowBtnBackgroundColor};
      if(key){
        newConfiguration[key] = value;
      }
      props.onChangeValue({config: newConfiguration, isTouched: true});
    }

    let [messageText, setMessageText] = useState(config.messageText);
    let [daysBackgroundColor, setDaysBackgroundColor] = useState(config.daysBackgroundColor);
    let [hoursBackgroundColor, setHoursBackgroundColor] = useState(config.hoursBackgroundColor);
    let [minutesBackgroundColor, setMinutesBackgroundColor] = useState(config.minutesBackgroundColor);
    let [secondsBackgroundColor, setSecondsBackgroundColor] = useState(config.secondsBackgroundColor);
    let [buyNowBtnBackgroundColor, setBuyNowBtnBackgroundColor] = useState(config.buyNowBtnBackgroundColor);
    let [backgroundColor, setBackgroundColor] = useState(config.backgroundColor);
    let [daysLabelTextColor, setDaysLabelTextColor] = useState(config.daysLabelTextColor);
    let [hoursLabelTextColor, setHoursLabelTextColor] = useState(config.hoursLabelTextColor);
    let [minutesLabelTextColor, setMinutesLabelTextColor] = useState(config.minutesLabelTextColor);
    let [secondsLabelTextColor, setSecondsLabelTextColor] = useState(config.secondsLabelTextColor);
    let [daysCountTextColor, setDaysCountTextColor] = useState(config.daysCountTextColor);
    let [hoursCountTextColor, setHoursCountTextColor] = useState(config.hoursCountTextColor);
    let [minutesCountTextColor, setMinutesCountTextColor] = useState(config.minutesCountTextColor);
    let [secondsCountTextColor, setSecondsCountTextColor] = useState(config.secondsCountTextColor);
    let [messageTextColor, setMessageTextColor] = useState(config.messageTextColor);
    let [buyNowBtnTextColor, setBuyNowBtnTextColor] = useState(config.buyNowBtnTextColor);
    let [buyNowBtnText, setBuyNowBtnText] = useState(config.buyNowBtnText);
    let [selectionState, setSelectionState] = useState(0);
    let [sizeSchema, setSizeSchema] = useState(config.sizeSchema);
    let [numbersCountFont, setNumbersCountFont] = useState("40px");
    let [labelFont, setLabelFont] = useState("16px");
    let [messageFont, setMessageFont] = useState("20px");
    let [messageLineHeight, setMessageLineHeight] = useState("92px");
    let [buyNowBtnFont, setBuyNowBtnFont] = useState("24px");
    let [buyNowBtnHeight, setBuyNowBtnHeight] = useState("78px");
    let [buyNowBtnTop, setBuyNowBtnTop] = useState("4px");
    let [numbersLineHeight, setNumbersLineHeight] = useState("48px");
    let [daysText, setDaysText] = useState(config.daysText);
    let [hoursText, setHoursText] = useState(config.hoursText);
    let [minutesText, setMinutesText] = useState(config.minutesText);
    let [secondsText, setSecondsText] = useState(config.secondsText);
    let [positionSchema, setPositionSchema] = useState(config.positionSchema);
    let [countdownIsActive, setCountdownIsActive] = useState(config.countdownIsActive);
    let [daysBackgroundTemplate, setDaysBackgroundTemplate] = useState(config.daysBackgroundTemplate);
    let [hoursBackgroundTemplate, setHoursBackgroundTemplate] = useState(config.HoursBackgroundTemplate);
    let [minutesBackgroundTemplate, setMinutesBackgroundTemplate] = useState(config.MinutesBackgroundTemplate);
    let [secondsBackgroundTemplate, setSecondsBackgroundTemplate] = useState(config.SecondsBackgroundTemplate);
    let [backgroundTemplate, setBackgroundTemplate] = useState(config.backgroundTemplate);
    let [buyNowBtnBackgroundTemplate, setBuyNowBtnBackgroundTemplate] = useState(config.buyNowBtnBackgroundTemplate);

    function updateStates(newConfig){
      setIsTouchedCallback(false);  
      setCountdownIsActive(newConfig.countdownIsActive);
      setMessageText(newConfig.messageText);
      setDaysBackgroundColor(newConfig.daysBackgroundColor);
      setHoursBackgroundColor(newConfig.hoursBackgroundColor);
      setMinutesBackgroundColor(newConfig.minutesBackgroundColor);
      setSecondsBackgroundColor(newConfig.secondsBackgroundColor);
      setBuyNowBtnBackgroundColor(newConfig.buyNowBtnBackgroundColor);
      setBackgroundColor(newConfig.backgroundColor);
      setDaysLabelTextColor(newConfig.daysLabelTextColor);
      setHoursLabelTextColor(newConfig.hoursLabelTextColor);
      setMinutesLabelTextColor(newConfig.minutesLabelTextColor);
      setSecondsLabelTextColor(newConfig.secondsLabelTextColor);
      setDaysCountTextColor(newConfig.daysCountTextColor);
      setHoursCountTextColor(newConfig.hoursCountTextColor);
      setMinutesCountTextColor(newConfig.minutesCountTextColor);
      setSecondsCountTextColor(newConfig.secondsCountTextColor);
      setMessageTextColor(newConfig.messageTextColor);
      setBuyNowBtnTextColor(newConfig.buyNowBtnTextColor);
      setBuyNowBtnText(newConfig.buyNowBtnText);
      setSizeSchema(newConfig.sizeSchema);
      setNumbersCountFont(newConfig.numbersCountFont);
      setLabelFont(newConfig.labelFont);
      setMessageFont(newConfig.messageFont);
      setMessageLineHeight(newConfig.messageLineHeight);
      setBuyNowBtnFont(newConfig.buyNowBtnFont);
      setBuyNowBtnHeight(newConfig.buyNowBtnHeight);
      setBuyNowBtnTop(newConfig.buyNowBtnTop);
      setNumbersLineHeight(newConfig.numbersLineHeight);
      setDaysText(newConfig.daysText);
      setHoursText(newConfig.hoursText);
      setMinutesText(newConfig.minutesText);
      setSecondsText(newConfig.secondsText);
      setPositionSchema(newConfig.positionSchema);
      setDaysBackgroundTemplate(newConfig.daysBackgroundTemplate);
      setHoursBackgroundTemplate(newConfig.hoursBackgroundTemplate);
      setMinutesBackgroundTemplate(newConfig.minutesBackgroundTemplate);
      setSecondsBackgroundTemplate(newConfig.secondsBackgroundTemplate);
      setBackgroundTemplate(newConfig.backgroundTemplate);
      setBuyNowBtnBackgroundTemplate(newConfig.buyNowBtnBackgroundTemplate);
      setEndTime(newConfig.endTime);
      setStartTime(newConfig.startTime);
      props.onChangeValue({config: newConfig});
    }

    useEffect(()=>{
      globalSetCountdownIsActive = setCountdownIsActive;
      globalSetIsTouchedCallback = setIsTouchedCallback;
      applySizeSchema(sizeSchema);

      return () => globalSetCountdownIsActive = null
    })



    
    

    return ( 
      
        <div>  
            <div onClick={() => setSelectionState(1)} className="container" style={{backgroundColor: backgroundColor}}>
                <div id="Timer">
                    <div className='message' id='Message'style={{color: messageTextColor, fontSize: messageFont, lineHeight: messageLineHeight}}>{messageText}</div>
                    <div>
                        <div onClick={(e) => {setSelectionState(2); e.stopPropagation();}} className='days' style={{backgroundColor: daysBackgroundColor}}>
                            <div className='numbers' id='TimerDays' style={{color: daysCountTextColor, fontSize: numbersCountFont, lineHeight: numbersLineHeight}}>{days}</div>
                            <span id='DaysText' style={{color: daysLabelTextColor, fontSize: labelFont}}>{daysText}</span>
                        </div>
                        <div onClick={(e) => {setSelectionState(3); e.stopPropagation();}} className='hours' style={{backgroundColor: hoursBackgroundColor}}>
                            <div className='numbers' id='TimerHours' style={{color: hoursCountTextColor, fontSize: numbersCountFont, lineHeight: numbersLineHeight}}>{hours}</div>
                            <span id='HoursText' style={{color: hoursLabelTextColor, fontSize: labelFont}}>{hoursText}</span>
                        </div>
                        <div onClick={(e) => {setSelectionState(4); e.stopPropagation();}} className='minutes' style={{backgroundColor: minutesBackgroundColor}}>
                            <div className='numbers'  id='TimerMinutes' style={{color: minutesCountTextColor, fontSize: numbersCountFont, lineHeight: numbersLineHeight}}>{minutes}</div>
                            <span id='MinutesText' style={{color: minutesLabelTextColor, fontSize: labelFont}}>{minutesText}</span>
                        </div>
                        <div onClick={(e) => {setSelectionState(5); e.stopPropagation();}} className='seconds' style={{backgroundColor: secondsBackgroundColor}}>
                            <div className='numbers' id='TimerSeconds' style={{color: secondsCountTextColor, fontSize: numbersCountFont, lineHeight: numbersLineHeight}}>{seconds}</div>
                            <span id='SecondsText' style={{color: secondsLabelTextColor, fontSize: labelFont}}>{secondsText}</span>
                        </div>
                    </div>
                    <div title="Click to Edit the Buy Now action Button"><button   onClick={(e) => {setSelectionState(6); e.stopPropagation();}} className='buyNowBtn animated tada' style={{backgroundColor: buyNowBtnBackgroundColor, color: buyNowBtnTextColor, fontSize: buyNowBtnFont, height: buyNowBtnHeight, top: buyNowBtnTop}} id='BuyNowButton'>{buyNowBtnText}</button></div>
                </div>
            </div>
            
            <form>
                <Page fullWidth>
                  {(startTime > endTime || Date.now() > endTime) &&(
                    <div>
                      <Banner title="Countdown expired" status="critical">
                        <p>Chose a new end date</p>
                      </Banner>
                      <br />
                    </div>
                  )}
                  {isTouchedCallback && (
                    <div>
                      <Banner title="Unsafed Changes" status="info">
                        <p>Press Save and Apply to save your Countdown and Apply it in your Store</p>
                      </Banner>
                      <br />
                    </div>
                  )}
                  {startTime > Date.now() && countdownIsActive && !isTouchedCallback && (
                    <div>
                      <Banner title="Countdown starts soon" status="success">
                        
                        <p>Countdown start: {new Date(startTime).toLocaleString()}</p>
                        <p>Countdown end: {new Date(endTime).toLocaleString()}</p>
                      </Banner>
                      <br />
                    </div>
                  )}
                  {startTime <= Date.now() && countdownIsActive && !isTouchedCallback && (
                    <div>
                      <Banner title="Countdown is active" status="success">
                        <p>Countdown start: {new Date(startTime).toLocaleString()}</p>
                        <p>Countdown end: {new Date(endTime).toLocaleString()}</p>
                      </Banner>
                      <br />
                    </div>
                  )}
                
                
                    <Card title="Quickedit" sectioned>
                      <div className="quickEditGrid">
                        <div>

                          <ChoiceList title="Countdown size" choices={sizeChoices} 
                          onChange={(selection) => {setSizeSchema(selection[0]); applySizeSchema(selection[0]);updateConfigurationObject("sizeSchema",selection[0])}} 
                          selected={sizeSchema} />
                        </div>

                        <div>

                          
                          
                          <label>End Date
                            <br />
                            <input type="datetime-local"
                            value={returnStringDateFrom(endTime-timezoneOffsetInMS)} 
                            onChange={(e) => {
                              setEndTime(new Date(e.target.value).getTime());
                              updateConfigurationObject("endTime",new Date(e.target.value).getTime());
                            }} 
                            min={returnStringDateFrom(startTime-timezoneOffsetInMS)} 
                            />
                          </label>
                          <br /><br />
                          <label>
                            Start Date
                            <br />
                            <input type="datetime-local" 
                            value={returnStringDateFrom(startTime-timezoneOffsetInMS)} 
                            onChange={(e) => {
                              setStartTime(new Date(e.target.value).getTime());
                              updateConfigurationObject("startTime",new Date(e.target.value).getTime());
                            }} 
                            max={returnStringDateFrom(endTime-timezoneOffsetInMS)} 
                            /> 
                          </label>

                          
                          
                        </div>
                        <div style={{transform: "translateY(-32px)"}}>
                          {selectionState === 0  &&(
                            <ClickHereImage />
                          )}
                        </div>
                      </div>

                    </Card>
                    <br />
                    
                        {selectionState === 0 && (
                            <div className="nothingSelected">
                                <TextContainer>
                                    <Heading>Nothing selected</Heading>
                                    <p>
                                        Click on your Countdown preview for customization!
                                    </p>
                                </TextContainer>
                            </div>
                        )}
                        {selectionState === 1 && (
    
                            <Card title="Layout Edit" sectioned>
                                <TextField label="Message to the User" value={messageText} onChange={(e) => {setMessageText(e);updateConfigurationObject("messageText",e)}} inputMode="text" maxLength={30} />
                                <div className="oneThirdGrid">

                                
                                
                                <div>
                                    
                                    <p className="colorDescription">
                                        <TextStyle variation="strong">Background Color</TextStyle>
                                    </p>
                                    <BlockPicker color={backgroundColor} colors={colorPalette} 
                                    onChangeComplete={(color) => {setBackgroundColor(color.hex);updateConfigurationObject("backgroundColor",color.hex)}} />
                                </div>
                                <div>
                                    
                                    <p className="colorDescription">
                                        <TextStyle variation="strong">Message Color</TextStyle>
                                    </p>
                                    <BlockPicker color={messageTextColor} colors={colorPalette} 
                                    onChangeComplete={(color) => {setMessageTextColor(color.hex);updateConfigurationObject("messageTextColor",color.hex)}} label="hex" />
                                </div>
                                <div>

                                </div>

                                </div>
                            </Card>

                        )}
                        {selectionState === 2 && (

                            <Card title="Days Edit" sectioned>
                                <TextField label="Label Text" value={daysText} onChange={(e) => {setDaysText(e);updateConfigurationObject("daysText",e)}} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Days Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={daysBackgroundColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setDaysBackgroundColor(color.hex);updateConfigurationObject("daysBackgroundColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Days Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={daysCountTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setDaysCountTextColor(color.hex);updateConfigurationObject("daysCountTextColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Days Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={daysLabelTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setDaysLabelTextColor(color.hex);updateConfigurationObject("daysLabelTextColor",color.hex)}} />
                                    </div>
                                </div>
                            </Card>

                        )}
                        {selectionState === 3 && (
                            <Card title="Hours Edit" sectioned>
                                <TextField label="Label Text" value={hoursText} onChange={(e) => {setHoursText(e);updateConfigurationObject("hoursText",e)}} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Hours Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={hoursBackgroundColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setHoursBackgroundColor(color.hex);updateConfigurationObject("hoursBackgroundColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Hours Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={hoursCountTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setHoursCountTextColor(color.hex);updateConfigurationObject("hoursCountTextColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Hours Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={hoursLabelTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setHoursLabelTextColor(color.hex);updateConfigurationObject("hoursLabelTextColor",color.hex)}} />
                                    </div>
                                </div>
                            </Card>
                        )}
                        {selectionState === 4 && (
                            <Card title="Minutes Edit" sectioned>
                                <TextField label="Label Text" value={minutesText} 
                                onChange={(e) => {setMinutesText(e);updateConfigurationObject("minutesText",e)}} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Minutes Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={minutesBackgroundColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setMinutesBackgroundColor(color.hex);updateConfigurationObject("minutesBackgroundColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Minutes Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={minutesCountTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setMinutesCountTextColor(color.hex);updateConfigurationObject("minutesCountTextColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Minutes Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={minutesLabelTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setMinutesLabelTextColor(color.hex);updateConfigurationObject("minutesLabelTextColor",color.hex)}} />
                                    </div>
                                </div>
                            </Card>
                        )}
                        {selectionState === 5 && (
                            <Card title="Seconds Edit" sectioned>
                                <TextField label="Label Text" value={secondsText} 
                                onChange={(e) => {setSecondsText(e);updateConfigurationObject("secondsText",e)}} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Seconds Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={secondsBackgroundColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setSecondsBackgroundColor(color.hex);updateConfigurationObject("secondsBackgroundColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Seconds Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={secondsCountTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setSecondsCountTextColor(color.hex);updateConfigurationObject("secondsCountTextColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Seconds Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={secondsLabelTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setSecondsLabelTextColor(color.hex);updateConfigurationObject("secondsLabelTextColor",color.hex)}} />
                                    </div>
                                </div>
                            </Card>
                        )}
                        {selectionState === 6 && (
                            <Card title="Call to action" sectioned>
                                <TextField label="Call to action Text" value={buyNowBtnText} 
                                onChange={(e) => {setBuyNowBtnText(e);updateConfigurationObject("buyNowBtnText",e)}} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Button Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={buyNowBtnBackgroundColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setBuyNowBtnBackgroundColor(color.hex);updateConfigurationObject("buyNowBtnBackgroundColor",color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Button Text Color</TextStyle>
                                        </p>
                                        <BlockPicker color={buyNowBtnTextColor} colors={colorPalette} 
                                        onChangeComplete={(color) => {setBuyNowBtnTextColor(color.hex);updateConfigurationObject("buyNowBtnTextColor",color.hex)}} />
                                    </div>
                                </div>
                            </Card>
                        )}
                    
                    
                </Page>
            </form>
        </div>
     );
     

}

const methods = {
  componentDidUpdate(props){
    globalSetCountdownIsActive(props.countdownIsActive);
    globalSetIsTouchedCallback(props.isTouchedCallback);
    
  }
}

 
export default lifecycle(methods)(CountdownApp);