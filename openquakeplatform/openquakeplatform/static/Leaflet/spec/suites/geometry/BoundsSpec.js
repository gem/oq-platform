describe('Bounds', function() {
	var a, b, c;

	beforeEach(function() {
		a = new L.Bounds(
			new L.Point(14, 12),
			new L.Point(30, 40));
		b = new L.Bounds([
			new L.Point(20, 12),
			new L.Point(14, 20),
			new L.Point(30, 40)
		]);
		c = new L.Bounds();
	});

	describe('constructor', function() {
		it('should create bounds with proper min & max on (Point, Point)', function() {
			expect(a.min).toEqual(new L.Point(14, 12));
			expect(a.max).toEqual(new L.Point(30, 40));
		});
		it('should create bounds with proper min & max on (Point[])', function() {
			expect(b.min).toEqual(new L.Point(14, 12));
			expect(b.max).toEqual(new L.Point(30, 40));
		});
	});

	describe('#extend', function() {
		it('should extend the bounds to contain the given point', function() {
			a.extend(new L.Point(50, 20));
			expect(a.min).toEqual(new L.Point(14, 12));
			expect(a.max).toEqual(new L.Point(50, 40));

			b.extend(new L.Point(25, 50));
			expect(b.min).toEqual(new L.Point(14, 12));
			expect(b.max).toEqual(new L.Point(30, 50));
		});
	});

	describe('#getCenter', function() {
		it('should return the center point', function() {
			expect(a.getCenter()).toEqual(new L.Point(22, 26));
		});
	});

	describe('#contains', function() {
		it('should contains other bounds or point', function() {
			a.extend(new L.Point(50, 10));
			expect(a.contains(b)).toBeTruthy();
			expect(b.contains(a)).toBeFalsy();
			expect(a.contains(new L.Point(24, 25))).toBeTruthy();
			expect(a.contains(new L.Point(54, 65))).toBeFalsy();
		});
	});

	describe('#isValid', function() {
		it('should return true if properly set up', function() {
			expect(a.isValid()).toBeTruthy();
		});
		it('should return false if is invalid', function() {
			expect(c.isValid()).toBeFalsy();
		});
		it('should be valid if extended', function() {
			c.extend([0, 0]);
			expect(c.isValid()).toBeTruthy();
		});
	});

	describe('#getSize', function () {
		it('should return the size of the bounds as point', function () {
			expect(a.getSize()).toEqual(new L.Point(16, 28));
		});
	});

	describe('#intersects', function () {
		it('should return true if bounds intersect', function () {
			expect(a.intersects(b)).toBe(true);
			expect(a.intersects(new L.Bounds(new L.Point(100, 100), new L.Point(120, 120)))).toEqual(false);
		});
	});

	describe('L.bounds factory', function () {
		it('should create bounds from array of number arrays', function () {
			var bounds = L.bounds([[14, 12], [30, 40]]);
			expect(bounds).toEqual(a);
		});
	});
});
