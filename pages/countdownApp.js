import { useState, useCallback} from 'react';
import { TextField, Heading, TextStyle, Card,TextContainer, Page, ChoiceList } from '@shopify/polaris';
import React from 'react';
import {BlockPicker} from 'react-color'

const CountdownApp = (props) => {

  
    
    const config = props.configuration;

    

    const year = new Date().getFullYear();
    let endTime = config.endTime ? config.endTime : new Date(year, 5, 4).getTime();
    let today = new Date().getTime();
    let diff = endTime - today;
    let [days, setDays] = useState(Math.floor(diff / (1000 * 60 * 60 * 24)));
    let [hours, setHours] = useState(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let [minutes, setMinutes] = useState(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    let [seconds, setSeconds] = useState(Math.floor((diff % (1000 * 60)) / 1000));

    let Timer = setInterval(function () {
        today = new Date().getTime();
        diff = endTime - today;
        setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
        
    }, 1000);

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

    const sizeChoices = [
        {label: 'Tiny', value: "1"},
        {label: 'Small', value: "2"},
        {label: 'Normal', value: "0"},
        {label: 'Large', value: "3"}
    ]
    const gradient_1 = 'linear-gradient(170deg, rgba(49, 57, 73, 0.8) 20%, rgba(49, 57, 73, 0.5) 20%, rgba(49, 57, 73, 0.5) 35%, rgba(41, 48, 61, 0.6) 35%, rgba(41, 48, 61, 0.8) 45%, rgba(31, 36, 46, 0.5) 45%, rgba(31, 36, 46, 0.8) 75%, rgba(49, 57, 73, 0.5) 75%), linear-gradient(45deg, rgba(20, 24, 31, 0.8) 0%, rgba(41, 48, 61, 0.8) 50%, rgba(82, 95, 122, 0.8) 50%, rgba(133, 146, 173, 0.8) 100%)';


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
                setNumbersCountFont("40px");
                setNumbersLineHeight("48px");
                setLabelFont("16px");
                setMessageFont("18px");
                setMessageLineHeight("92px");
                setBuyNowBtnFont("24px");
                setBuyNowBtnHeight("78px");
                setBuyNowBtnTop("4px");
                break;
        }
    }

    const updateConfigurationObject = () => {
        const newConfiguration = {
            endTime,sizeSchema,positionSchema,messageText,buyNowBtnText,daysText,
            hoursText,minutesText,secondsText,messageTextColor,buyNowBtnTextColor,
            daysCountTextColor,hoursCountTextColor,minutesCountTextColor,secondsCountTextColor,
            daysLabelTextColor,hoursLabelTextColor,minutesLabelTextColor,secondsLabelTextColor,
            containerBackgroundColor, daysBackgroundColor, hoursBackgroundColor, minutesBackgroundColor, secondsBackgroundColor, buyNowBtnBackgroundColor};
        props.onChangeValue(newConfiguration);
    }

    function formChanged(){
      console.log("form changed");
    }

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
                        <ChoiceList title="Countdown Size" choices={sizeChoices} onChange={(selection) => {setSizeSchema(selection[0]); applySizeSchema(selection[0])}} selected={sizeSchema} />
                    </Card>
                    <br />
                        {selectionState === 0 && (
                            <div className="nothingSelected">
                                <TextContainer>
                                    <Heading>Nothing selected</Heading>
                                    <p>
                                        Click on the Countdown preview to select a element for styling.
                                    </p>
                                </TextContainer>
                            </div>
                        )}
                        {selectionState === 1 && (
    
                            <Card title="Layout Edit" sectioned>
                                <TextField label="Message to the User" value={messageText} onChange={(e) => {setMessageText(e);updateConfigurationObject()}} inputMode="text" maxLength={30} />
                                <div className="oneThirdGrid">

                                
                                
                                <div>
                                    
                                    <p className="colorDescription">
                                        <TextStyle variation="strong">Background Color</TextStyle>
                                    </p>
                                    <BlockPicker color={containerBackgroundColor} colors={colorPalette} onChangeComplete={(color) => {setBackgroundColor(color.hex)}} />
                                </div>
                                <div>
                                    
                                    <p className="colorDescription">
                                        <TextStyle variation="strong">Message Color</TextStyle>
                                    </p>
                                    <BlockPicker color={messageTextColor} colors={colorPalette} onChangeComplete={(color) => {setMessageTextColor(color.hex)}} label="hex" />
                                </div>
                                <div>

                                </div>
                                
                                
                                
                                </div>
                            </Card>

                        )}
                        {selectionState === 2 && (

                            <Card title="Days Edit" sectioned>
                                <TextField label="Label Text" value={daysText} onChange={(e) => setDaysText(e)} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Days Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={daysBackgroundColor} colors={colorPalette} onChangeComplete={(color) => {setDaysBackgroundColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Days Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={daysCountTextColor} colors={colorPalette} onChangeComplete={(color) => {setDaysCountTextColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Days Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={daysLabelTextColor} colors={colorPalette} onChangeComplete={(color) => {setDaysLabelTextColor(color.hex)}} />
                                    </div>
                                </div>
                            </Card>

                        )}
                        {selectionState === 3 && (
                            <Card title="Hours Edit" sectioned>
                                <TextField label="Label Text" value={hoursText} onChange={(e) => setHoursText(e)} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Hours Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={hoursBackgroundColor} colors={colorPalette} onChangeComplete={(color) => {setHoursBackgroundColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Hours Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={hoursCountTextColor} colors={colorPalette} onChangeComplete={(color) => {setHoursCountTextColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Hours Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={hoursLabelTextColor} colors={colorPalette} onChangeComplete={(color) => {setHoursLabelTextColor(color.hex)}} />
                                    </div>
                                </div>
                            </Card>
                        )}
                        {selectionState === 4 && (
                            <Card title="Minutes Edit" sectioned>
                                <TextField label="Label Text" value={minutesText} onChange={(e) => setMinutesText(e)} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Minutes Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={minutesBackgroundColor} colors={colorPalette} onChangeComplete={(color) => {setMinutesBackgroundColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Minutes Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={minutesCountTextColor} colors={colorPalette} onChangeComplete={(color) => {setMinutesCountTextColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Minutes Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={minutesLabelTextColor} colors={colorPalette} onChangeComplete={(color) => {setMinutesLabelTextColor(color.hex)}} />
                                    </div>
                                </div>
                            </Card>
                        )}
                        {selectionState === 5 && (
                            <Card title="Seconds Edit" sectioned>
                                <TextField label="Label Text" value={secondsText} onChange={(e) => setSecondsText(e)} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Seconds Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={secondsBackgroundColor} colors={colorPalette} onChangeComplete={(color) => {setSecondsBackgroundColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Seconds Time Color</TextStyle>
                                        </p>
                                        <BlockPicker color={secondsCountTextColor} colors={colorPalette} onChangeComplete={(color) => {setSecondsCountTextColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Seconds Label Color</TextStyle>
                                        </p>
                                        <BlockPicker color={secondsLabelTextColor} colors={colorPalette} onChangeComplete={(color) => {setSecondsLabelTextColor(color.hex)}} />
                                    </div>
                                </div>
                            </Card>
                        )}
                        {selectionState === 6 && (
                            <Card title="Button Edit" sectioned>
                                <TextField label="Button Text" value={buyNowBtnText} onChange={(e) => setBuyNowBtnText(e)} inputMode="text" maxLength={15} />
                                <div className="oneThirdGrid">
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Button Background Color</TextStyle>
                                        </p>
                                        <BlockPicker color={buyNowBtnBackgroundColor} colors={colorPalette} onChangeComplete={(color) => {setBuyNowBtnBackgroundColor(color.hex)}} />
                                    </div>
                                    <div>
                                        <p className="colorDescription">
                                            <TextStyle variation="strong">Button Text Color</TextStyle>
                                        </p>
                                        <BlockPicker color={buyNowBtnTextColor} colors={colorPalette} onChangeComplete={(color) => {setBuyNowBtnTextColor(color.hex)}} />
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