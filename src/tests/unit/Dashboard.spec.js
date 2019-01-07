import Dashboard from '@/components/Dashboard.vue'

describe('Dashboard.vue', () => {

  // Test the getSpeedInKmPerHour() method
  it('Has a getSpeedInKmPerHour method', () => {
    expect(typeof Dashboard.methods.getSpeedInKmPerHour).toBe('function');
  })

  it('getSpeedInKmPerHour lower speed range', () => {
    const speed = Dashboard.methods.getSpeedInKmPerHour(.013);
    expect(speed).toBe(46.8);
  })

  it('getSpeedInKmPerHour idle drone', () => {
    const speed = Dashboard.methods.getSpeedInKmPerHour(0);
    expect(speed).toBe(0);
  })


  // Test the getRowColor() method
  it('Has a getRowColor method', () => {
    expect(typeof Dashboard.methods.getRowColor).toBe('function');
  })

  it('Check for White row color', () => {
    expect(Dashboard.methods.getRowColor(0)).toBe('White');
  })

  it('Check for Yellow row color', () => {
    expect(Dashboard.methods.getRowColor(10)).toBe('Yellow');
  })


  // Test the getIdleSeconds() method
  it('Has a getIdleSeconds method', () => {
    expect(typeof Dashboard.methods.getIdleSeconds).toBe('function');
  })

  it('getIdleSeconds negative distance', () => {
    const idleSeconds = Dashboard.methods.getIdleSeconds(-100, 0);
    expect(idleSeconds).toBe(1)
  })

  it('getIdleSeconds idle', () => {
    const idleSeconds = Dashboard.methods.getIdleSeconds(0.0009, 0);
    expect(idleSeconds).toBe(1)
  })

  it('getIdleSeconds non idle', () => {
    const idleSeconds = Dashboard.methods.getIdleSeconds(10, 0);
    expect(idleSeconds).toBe(0)
  })
})
