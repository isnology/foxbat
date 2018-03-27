
i_class = InstrumentClass.create!({ name: 'Radio' })
puts 'Created instrument_class: radio'

Instrument.create!([
                      {
                          name: 'Two-Place Stereo Intercom',
                          brand: 'Dynon',
                          model: 'SV-INTERCOM-2S',
                          part_no: '',
                          text: 'Stereo, two-place intercom with audio connectivity for EFIS alerts and music that is usually only found in full-size audio panels.\nThe SV-INTERCOM-2S solves the problem of having to choose between an underfeatured intercom or an expensive audio panel. With ample inputs for EFIS systems, stereo music, and all the other technology in your panel, the SV-INTERCOM-2S has the features that your modern connected 2-place aircraft requires.',
                          price: 29500,
                          size: 'R',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 6,
                          picture_height: 13,
                          picture_url: 'https://s3-ap-southeast-2.amazonaws.com/coder-academy-alex-palma-sydney/dynon-sv-stereo-intercom-panel.png',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'VHF COM Radio',
                          brand: 'Dynon',
                          model: 'SV-COM-C25',
                          part_no: '',
                          text: 'By integrating deeply with your Dynon SkyView system, the SkyView COM Radio tunes frequencies by airport and station type - rather than by spinning in a number - at the touch of a button. You can also send frequencies over from the SkyView map airport info pages. For when you\'re feeling nostalgic (or are following ATC instructions), a dual concentric knob lets you spin in frequencies "the old fashioned way." SkyView will identify the airport and station type as you tune to help ensure you\'re talking to the right radio station. Dynon offers two COM radios: the SV-COM-C25 has 25 kHz channel spacing only. The SV-COM-X83 adds 8.33 kHz channel spacing.',
                          price: 129500,
                          size: 'R',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 6,
                          picture_height: 13,
                          picture_url: 'https://s3-ap-southeast-2.amazonaws.com/coder-academy-alex-palma-sydney/dynon-vhf-com-radio.png',
                          instrument_class_id: i_class.id
                      }

                  ])
puts 'Created Radio instruments'


i_class = InstrumentClass.create!({ name: 'Dynon' })
puts 'Created instrument_class: dynon'

Instrument.create!([
                    {
                      name: 'SkyView Classic',
                      brand: 'Dynon',
                      model: 'SV-D1000',
                      part_no: '',
                      text: 'The original next generation EFIS. Even without a touch screen, SkyView\'s intuitive controls and pilot-designed interface are designed to work in your cockpit. SkyView Classic, SkyView Touch, and SkyView HDX displays use the same modules and accessories. SkyView Classic displays can only connect to other SkyView Touch and SkyView Classic displays in an aircraft.\n\nExperimental and LSA pilots know that they have the most innovative GA aircraft flying. SkyView continues that tradition with the next generation of glass panels, offering redundant networks and systems, incredibly bright screens, design flexibility, and future upgradability unsurpassed by anything else flying.',
                      price: 35100,
                      size: 'D',
                      picture_h_offset: 0,
                      picture_v_offset: 0,
                      picture_width: 30,
                      picture_height: 20,
                      picture_url: 'http://www.dynonavionics.com/images/products/skyview/skyview-classic.png',
                      instrument_class_id: i_class.id
                    }
                  ])
puts 'Created Dynon instruments'


i_class = InstrumentClass.create!({ name: 'Altimeter' })
puts 'Created instrument_class: altimeter'
Instrument.create!([
                      {
                          name: 'Altimeter',
                          brand: 'UMA Inc.',
                          model: '',
                          part_no: '10-22965',
                          text: 'http://www.umainstruments.com/Altimeter.htm',
                          price: 17550,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.umainstruments.com/images/Altimeter/3altimeter.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Altimeter and Barometer 3 1/8 INCH / 9-30 VDC',
                          brand: 'Swift',
                          model: 'ALT3-10M2',
                          part_no: '10-06288',
                          text: 'https://www.aircraftspruce.com/catalog/inpages/swiftaltimeter10-06256.php',
                          price: 33671,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-06256a.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Altimeter and Barometer 2 1/4 INCH / 9-30 VDC',
                          brand: 'Swift',
                          model: 'ALT2-10F1',
                          part_no: '10-06284',
                          text: 'https://www.aircraftspruce.com/catalog/inpages/swiftaltimeter2.5.php',
                          price: 16185,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-06283a.JPG',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Radient Multi-function Instrument',
                          brand: 'Belite',
                          model: '',
                          part_no: '10-06258',
                          text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
                          price: 27595,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Altimeter',
                          brand: 'UMA Inc.',
                          model: '1',
                          part_no: '10-05125',
                          text: 'https://www.aircraftspruce.com/catalog/inpages/UMA_altimeters2.php',
                          price: 23586,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'https://www.aircraftspruce.com/catalog/graphics/10-22965.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Radient Multi-function Instrument',
                          brand: 'Belite',
                          model: '',
                          part_no: '10-06260',
                          text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
                          price: 27595,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Radient Multi-function Instrument',
                          brand: 'Belite',
                          model: '',
                          part_no: '10-06259',
                          text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
                          price: 27595,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Radient Multi-function Instrument',
                          brand: 'Belite',
                          model: '',
                          part_no: '10-06261',
                          text: 'http://www.aircraftspruce.com/pages/in/altimeters_belite/radiantmultifunction.php',
                          price: 27595,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/r/radiantmultifunction.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: '3-1/8 Gauge Non-sensitive Altimeter',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02252',
                          text: 'https://www.aircraftspruce.com/catalog/inpages/falconlightaltimeter.php',
                          price: 21500,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'https://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-05100m.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: '3-1/8 Sensitive Altimeter',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02259',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/alt201inf-3n.php',
                          price: 47900,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-02259.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: '2-1/4 Gauge Sensitive Altimeter',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-04071',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falcon214sensitive.php',
                          price: 22500,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02205m.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: '3-1/8 Non-sensitive Altimeter',
                          brand: 'Swift',
                          model: '',
                          part_no: '10-05365',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/ssp-lightaltimeter.php',
                          price: 22095,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-05100m.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Altimeter',
                          brand: 'UMA Inc.',
                          model: '2',
                          part_no: '10-05125',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/UMA_altimeters2.php',
                          price: 19575,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-22965.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Altimeter',
                          brand: 'UMA Inc.',
                          model: '',
                          part_no: '10-05133',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/UMA_altimeters2.php',
                          price: 36600,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-22965.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: '2-1/4 INCH Altimeter',
                          brand: 'Winter',
                          model: '',
                          part_no: '10-05634',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/microminialt.php',
                          price: 46200,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05634.jpg',
                          instrument_class_id: i_class.id
                      }
                  ])
   
puts 'Created altimeter instruments'


i_class = InstrumentClass.create({ name: 'Air Speed' })
puts 'Created instrumentClass: airSpeedIndicator'

Instrument.create!([
                      {
                          name: 'ASI / VSI 2.25 INCH Round Bezel 35-135 MPH',
                          brand: 'Belite',
                          model: '',
                          part_no: '10-04683',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/belitedual3.php',
                          price: 18995,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-04683x.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Airspeed Indicator 0-120 MPH',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02915',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi120m-3.php',
                          price: 18995,
                          size: 'L',
                          picture_h_offset: -0.15,
                          picture_v_offset: -0.2,
                          picture_width: 12.1,
                          picture_height: 11.8,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02915.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Dual Dial Airspeed Indicator 20-160 MPH / 20-140 KNOTS',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02227',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi164mn-3.php',
                          price: 19995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02227.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Airspeed Indicator 0-120 KNOTS',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02898',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi120n-3.php',
                          price: 18995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02898.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Airspeed Indicator 0-140 KNOTS',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02899',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/FAlconasi140n-3.php',
                          price: 19995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02899.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Airspeed Indicator 0-140 KNOTS',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02916',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi140m-3.php',
                          price: 18995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02916.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Minature Airspeed Indicator 0-120 KNOTS',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-04069',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/asi120n-2.php',
                          price: 17995,
                          size: 'M',
                          picture_h_offset: -0.3,
                          picture_v_offset: 0.1,
                          picture_width: 8.6,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-04069.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Airspeed Indicator 0-120 KNOTS',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02625',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconasi120k-3.php',
                          price: 18995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02625.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Minature Airspeed Indicator 0-120 KPH',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02226',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/asi140k-2.php',
                          price: 17995,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02226.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Airspeed Indicator 0-120 KNOTS with Pitot Kit',
                          brand: 'Falcon',
                          model: '',
                          part_no: 'AS026',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconas026.php',
                          price: 19995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02898.jpg',
                          instrument_class_id: i_class.id
                      }
                  ])
puts 'Created airSpeedIndicator instruments'


i_class = InstrumentClass.create!({ name: 'Attitude' })
puts 'Created instrumentClass: attitudeIndicator'

Instrument.create!([
                      {
                          name: 'D2 Pocket Panel - Portable EFIS',
                          brand: 'Dynon',
                          model: '',
                          part_no: '11-12158',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/dynond2_11-12158.php',
                          price: 99500,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/11-12158.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Avionics AV-2 Attitude Display',
                          brand: 'Falcon',
                          model: '',
                          part_no: '11-05690',
                          text: 'http://www.aircraftspruce.com/pages/in/attitude_mgl/1105690.php',
                          price: 26000,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/11-05690.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Electric Attitude Gyro',
                          brand: 'Skysports',
                          model: '',
                          part_no: '10-05422',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/ssp-10-05422.php',
                          price: 123600,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02164-s.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Electrical 14V Lighted Attitude Gyro with Connector and Clamp',
                          brand: 'Skysports',
                          model: '',
                          part_no: '10-05310',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/gh02e-3lcc.php',
                          price: 126200,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02164-s.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Vacuum Attitude Gyro',
                          brand: 'Skysports',
                          model: '',
                          part_no: '10-05423',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/ssp-10-05423.php',
                          price: 51900,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-22955.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Gemini ADI',
                          brand: 'Trutrak',
                          model: '',
                          part_no: '11-10451',
                          text: 'http://www.aircraftspruce.com/pages/in/attitude_trutrak/geminiadi.php',
                          price: 97000,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/11-104512013.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'ADI2',
                          brand: 'Trutrak',
                          model: '',
                          part_no: '11-05736',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/trutrakADI2a.php',
                          price: 126100,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/11-05735.jpg',
                          instrument_class_id: i_class.id
                      }
                  ])
puts 'Created attitudeIndicator instruments'


i_class = InstrumentClass.create!({ name: 'Vertical Speed' })
puts 'Created instrumentClass: verticalSpeedIndicator'

Instrument.create!([
                      {
                          name: 'Vertical Speed Inidicator with 2.25 INCH Round Bezel',
                          brand: 'Belite',
                          model: '',
                          part_no: '10-04351',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/belitevsiadapter.php',
                          price: 11995,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-04351x.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Vertical Speed Indicator',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-05352',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed2.php',
                          price: 22095,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05352.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: '2-1/4 Vertical Speed Indicator - 2,000 FT / MIN',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-01643',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed6.php',
                          price: 25795,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05205.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Vertical Speed Indicator - 3-1/8 INCH 10 METER RANGE',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-02246',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed4.php',
                          price: 22395,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-02246.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Vertical Speed Indicator - 3-1/8 INCH 3,000 FT RANGE',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-05210',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed3.php',
                          price: 23995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/10-05210.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Vertical Speed Indicator - 2-1/4 INCH 10 METER RANGE',
                          brand: 'Falcon',
                          model: '',
                          part_no: '10-00983',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falconvertspeed5.php',
                          price: 25795,
                          size: 'M',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 8.5,
                          picture_height: 8.5,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-00983.jpg',
                          instrument_class_id: i_class.id
                      },
                      {
                          name: 'Non TSO 3-1/8 Vertical Speed Indicator 2K FT / MIN',
                          brand: 'Skysports',
                          model: '',
                          part_no: '10-05361',
                          text: 'http://www.aircraftspruce.com/catalog/inpages/falcon10-05205.php',
                          price: 27995,
                          size: 'L',
                          picture_h_offset: 0,
                          picture_v_offset: 0,
                          picture_width: 11,
                          picture_height: 11,
                          picture_url: 'http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-05205.jpg',
                          instrument_class_id: i_class.id
                      },
                  ])
puts 'Created verticalSpeedIndicator instruments'
