import { useState, useCallback, useEffect, useRef } from 'react';
import { TextField, Heading, TextStyle, Card,TextContainer, Page, ChoiceList } from '@shopify/polaris';
import React from 'react';
import {BlockPicker} from 'react-color'

const CountdownApp = (props) => {

  
    
    const config = props.configuration;

    const timezoneOffsetInMS = new Date().getTimezoneOffset() * 60 * 1000;

    

    let [endTime, setEndTime] = useState(config.endTime);
    let [endTimeToday, setEndTimeToday] = useState(returnTimeTodayFor(config.endTime) - timezoneOffsetInMS);
    let [startTime, setStartTime] = useState(config.startTime);
    let [startTimeToday, setStartTimeToday] = useState(returnTimeTodayFor(config.startTime) - timezoneOffsetInMS);
    let [diff, setDiff] = useState(endTime - new Date().getTime());
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
    }, 50);

    function setTime(){
      setDiff(endTime - new Date().getTime());      
      if(endTime - new Date().getTime() > 0){
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
      }else{
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }



    function returnStringTimeFrom(TS){
      return new Date(TS).toISOString().slice(-13,-8);
    }
    function returnStringDateFrom(TS){
      return new Date(TS).toISOString().split('.')[0].slice(0,-9);
    }

    function applyEndTimeAndSetDate(hourMinuteString){
      const endDateTS = (new Date(new Date(endTime).toLocaleDateString())).getTime();
      let newEndTimeToday = returnTimeTodayFor(new Date(timestampFrom(hourMinuteString)));
      let newEndTimeTS = newEndTimeToday+endDateTS;
      const newStartTime = Date.now();
      if(newEndTimeTS < newStartTime){
        newEndTimeTS =  newStartTime;
        newEndTimeToday = returnTimeTodayFor(newStartTime) - timezoneOffsetInMS;
      }
      setEndTimeToday(newEndTimeToday);
      setEndTime(newEndTimeTS);
      updateConfigurationObject("endTime",newEndTimeTS);
    }

    function applyStartTimeAndSetDate(hourMinuteString){
      const startDateTS = (new Date(new Date(startTime).toLocaleDateString())).getTime();
      let newStartTimeToday = returnTimeTodayFor(new Date(timestampFrom(hourMinuteString)));
      let newStartTimeTS = newStartTimeToday+startDateTS;
      
      if(endTime < newStartTimeTS){
        newEndTimeToday = returnTimeTodayFor(newStartTimeTS) - timezoneOffsetInMS;
        setEndTimeToday(newEndTimeToday);
        updateConfigurationObject("endTime",newEndTimeTS);
      }
      setStartTimeToday(newStartTimeToday);
      
      setEndTime(newStartTimeTS);
      
      updateConfigurationObject("startTime",newStartTimeTS);
    }

    const sizeChoices = [
        {label: 'Small', value: "1"},
        {label: 'Normal', value: "2"},
        {label: 'Large', value: "3"}
    ]

    const colorPalette = [
        "#FF0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"
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
        const newConfiguration = {
            endTime,sizeSchema,positionSchema,messageText,buyNowBtnText,daysText,
            hoursText,minutesText,secondsText,messageTextColor,buyNowBtnTextColor,
            daysCountTextColor,hoursCountTextColor,minutesCountTextColor,secondsCountTextColor,
            daysLabelTextColor,hoursLabelTextColor,minutesLabelTextColor,secondsLabelTextColor,
            containerBackgroundColor, daysBackgroundColor, hoursBackgroundColor, minutesBackgroundColor, secondsBackgroundColor, buyNowBtnBackgroundColor};
        newConfiguration[key] = value;
        if(endTime < startTime){
          setEndTime(startTime);
          setStartTimeToday(returnTimeTodayFor(config.startTime) - timezoneOffsetInMS)
          newConfiguration.endTime = endTime;
        }
        props.onChangeValue(newConfiguration);
    }

    let [messageText, setMessageText] = useState(config.messageText);
    let [daysBackgroundColor, setDaysBackgroundColor] = useState(config.daysBackgroundColor);
    let [hoursBackgroundColor, setHoursBackgroundColor] = useState(config.hoursBackgroundColor);
    let [minutesBackgroundColor, setMinutesBackgroundColor] = useState(config.minutesBackgroundColor);
    let [secondsBackgroundColor, setSecondsBackgroundColor] = useState(config.secondsBackgroundColor);
    let [buyNowBtnBackgroundColor, setBuyNowBtnBackgroundColor] = useState(config.buyNowBtnBackgroundColor);
    let [containerBackgroundColor, setBackgroundColor] = useState(config.backgroundColor);
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
    let [daysBackgroundTemplate, setDaysBackgroundTemplate] = useState(config.daysBackgroundTemplate);
    let [hoursBackgroundTemplate, setHoursBackgroundTemplate] = useState(config.HoursBackgroundTemplate);
    let [minutesBackgroundTemplate, setMinutesBackgroundTemplate] = useState(config.MinutesBackgroundTemplate);
    let [secondsBackgroundTemplate, setSecondsBackgroundTemplate] = useState(config.SecondsBackgroundTemplate);
    let [backgroundTemplate, setBackgroundTemplate] = useState(config.backgroundTemplate);
    let [buyNowBtnBackgroundTemplate, setBuyNowBtnBackgroundTemplate] = useState(config.buyNowBtnBackgroundTemplate);

    useEffect(()=>{
      applySizeSchema(sizeSchema);
    })

    return ( 
        <div>  
            <div onClick={() => setSelectionState(1)} className="container" style={{background: backgroundTemplate, backgroundColor: containerBackgroundColor}}>
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
                    <Card title="Quickedit" sectioned>
                        <ChoiceList title="Countdown Size" choices={sizeChoices} 
                        onChange={(selection) => {setSizeSchema(selection[0]); applySizeSchema(selection[0]);updateConfigurationObject("sizeSchema",selection[0])}} 
                        selected={sizeSchema} />
                        <input type="date" 
                        value={returnStringDateFrom(startTime)} 
                        onChange={(e) => {
                          setStartTime(new Date(e.target.value).getTime());
                          updateConfigurationObject("startTime",new Date(e.target.value).getTime());
                        }} 
                        max={returnStringDateFrom(endTime)} 
                        />
                        <input type="time"
                        value={returnStringTimeFrom(startTimeToday)}
                        onChange={(e)=>{
                          applyEndTimeAndSetDate(e.target.value);
                        }} 
                        max={returnStringTimeFrom(endTime-timezoneOffsetInMS)} 
                        />
                        <br />
                        <br />
                        <input type="date" 
                        value={returnStringDateFrom(endTime)} 
                        onChange={(e) => {
                          setEndTime(new Date(e.target.value).getTime());
                          updateConfigurationObject("endTime",new Date(e.target.value).getTime());
                        }} 
                        min={returnStringDateFrom(startTime)} 
                        />
                        <input type="time"
                        value={returnStringTimeFrom(endTimeToday)}
                        onChange={(e)=>{
                          applyStartTimeAndSetDate(e.target.value);
                        }} 
                        min={returnStringTimeFrom(startTime-timezoneOffsetInMS)} 
                        />
                        

                    </Card>
                    <br />
                        {selectionState === 0 && (
                            <div className="nothingSelected">
                                <TextContainer>
                                    <Heading>Nothing selected</Heading>
                                    <p>
                                        Click on your Countdown preview!
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
                                    <BlockPicker color={containerBackgroundColor} colors={colorPalette} 
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
                            <Card title="Button Edit" sectioned>
                                <TextField label="Button Text" value={buyNowBtnText} 
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
 
export default CountdownApp;