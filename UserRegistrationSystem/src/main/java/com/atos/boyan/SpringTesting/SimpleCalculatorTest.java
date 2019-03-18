package com.atos.boyan.SpringTesting;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class SimpleCalculatorTest {

	private SimpleCalculator simpleCalculator;

	@Before
	public void setUp() {
		simpleCalculator = new SimpleCalculator();
	}

	@Test
	public void verifyAdd() {
		long sum = simpleCalculator.addOperation(2, 1);
		assertEquals(3, sum);
	}

	@After
	public void teardown() {
		simpleCalculator = null;
	}



}
