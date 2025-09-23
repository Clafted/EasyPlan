

test("changeTarget from 0 to 0", () => {
    changeTarget(1);
    expect(target).toBe(0);
})