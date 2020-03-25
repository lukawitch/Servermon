import React, { useContext } from "react";
import { Form, FormGroup, Col, Row, Input } from "reactstrap";
import { observer } from "mobx-react-lite";
import { hostContext } from "../../context/hostContext";
import { HostFormTitle, HostPeportPosition } from "./styled";

const hostAliveCheckTimeSetting = observer(() => {
  const time = useContext(hostContext);

  const handleChangeStarthour = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    time.aliveCheckStartHour = event.target.value;
  };

  const handleChangeStartMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    time.aliveCheckStartMin = event.target.value;
  };

  const handleChangeStophour = (event: React.ChangeEvent<HTMLInputElement>) => {
    time.aliveCheckStopHour = event.target.value;
  };

  const handleChangeStopMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    time.aliveCheckStopMin = event.target.value;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    time.serverList[time.hostListNum].hostAliveCheckStartTime =
      time.aliveCheckStartHour + ":" + time.aliveCheckStartMin;
    time.serverList[time.hostListNum].hostAliveCheckStopTime =
      time.aliveCheckStopHour + ":" + time.aliveCheckStopMin;
    time.setHostAliveCheckOnOffTime(
      time.serverList[time.hostListNum].ip,
      time.hostListNum
    );
  };

  return (
    <HostPeportPosition>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <HostFormTitle>
            <Col sm="5">
              <Row>
                <Col xs="6">
                  {" "}
                  <Input
                    type="select"
                    onChange={handleChangeStarthour}
                    value={time.aliveCheckStartHour}
                  >
                    <option value="">선택해주세요</option>
                    <option value="00">0시</option>
                    <option value="01">1시</option>
                    <option value="02">2시</option>
                    <option value="03">3시</option>
                    <option value="04">4시</option>
                    <option value="05">5시</option>
                    <option value="06">6시</option>
                    <option value="07">7시</option>
                    <option value="08">8시</option>
                    <option value="09">9시</option>
                    <option value="10">10시</option>
                    <option value="11">11시</option>
                    <option value="12">12시</option>
                    <option value="13">13시</option>
                    <option value="14">14시</option>
                    <option value="15">15시</option>
                    <option value="16">16시</option>
                    <option value="17">17시</option>
                    <option value="18">18시</option>
                    <option value="19">19시</option>
                    <option value="20">20시</option>
                    <option value="21">21시</option>
                    <option value="22">22시</option>
                    <option value="23">23시</option>
                  </Input>
                </Col>
                <Col xs="6">
                  {" "}
                  <Input
                    type="select"
                    onChange={handleChangeStartMin}
                    value={time.aliveCheckStartMin}
                  >
                    <option value="">선택해주세요</option>
                    <option value="00">0</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="7">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                  </Input>
                </Col>
              </Row>
            </Col>
            ~
            <Col sm="5">
              <Row>
                <Col xs="6">
                  {" "}
                  <Input
                    type="select"
                    onChange={handleChangeStophour}
                    value={time.aliveCheckStopHour}
                  >
                    <option value="">선택해주세요</option>
                    <option value="00">0</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                  </Input>
                </Col>
                <Col xs="6">
                  {" "}
                  <Input
                    type="select"
                    onChange={handleChangeStopMin}
                    value={time.aliveCheckStopMin}
                  >
                    <option value="">선택해주세요</option>
                    <option value="00">0</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                  </Input>
                </Col>
              </Row>
            </Col>
          </HostFormTitle>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="1"></Col>
            <Col sm="10">
              <Input type="submit" value="Edit" />
            </Col>
            <Col sm="1"></Col>
          </Row>
        </FormGroup>
      </Form>{" "}
    </HostPeportPosition>
  );
});

export default hostAliveCheckTimeSetting;
