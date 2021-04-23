import { TrainType } from "./models";

test("test train type", () => {
  const trainType = new TrainType("name");
  expect(trainType.name).toEqual("name");
  expect(trainType.nameShort).toEqual("");
  expect(trainType.borderStyle.style).toEqual(
    TrainType.DEFAULT.BORDER_STYLE.STYLE
  );
  expect(trainType.borderStyle.width).toEqual(
    TrainType.DEFAULT.BORDER_STYLE.WIDTH
  );
  expect(trainType.borderStyle.color).toEqual(
    TrainType.DEFAULT.BORDER_STYLE.COLOR
  );

  const trainType2 = new TrainType("name", "nameShort", {
    style: "solid",
    width: 2,
    color: "color",
  });
  expect(trainType2.name).toEqual("name");
  expect(trainType2.nameShort).toEqual("nameShort");
  expect(trainType2.borderStyle.style).toEqual("solid");
  expect(trainType2.borderStyle.width).toEqual(2);
  expect(trainType2.borderStyle.color).toEqual("color");
});
