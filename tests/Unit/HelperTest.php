<?php

namespace MyLaravelCore\Tests\Unit;

use PHPUnit\Framework\TestCase;

class HelperTest extends TestCase
{
    public function test_persian_digits_conversion(): void
    {
        $this->assertEquals('۱۲۳۴۵۶۷۸۹۰', persian_digits('1234567890'));
        $this->assertEquals('۱۲۳', persian_digits('١٢٣')); // Arabic digits
    }

    public function test_english_digits_conversion(): void
    {
        $this->assertEquals('1234567890', english_digits('۱۲۳۴۵۶۷۸۹۰'));
        $this->assertEquals('1234567890', english_digits('١٢٣٤٥٦٧٨٩٠'));
    }

    public function test_national_code_validation(): void
    {
        // Valid national codes
        $this->assertTrue(is_valid_national_code('0010350810'));
        $this->assertTrue(is_valid_national_code('0084575948'));

        // Invalid codes (incorrect length, checksum or repetitive)
        $this->assertFalse(is_valid_national_code('1111111111'));
        $this->assertFalse(is_valid_national_code('0000000000'));
        $this->assertFalse(is_valid_national_code('123456789'));
        $this->assertFalse(is_valid_national_code('1234567890'));
    }

    public function test_mobile_validation_and_clean(): void
    {
        $this->assertTrue(is_valid_mobile('09123456789'));
        $this->assertTrue(is_valid_mobile('+989123456789'));
        $this->assertTrue(is_valid_mobile('۰۹۱۲۳۴۵۶۷۸۹'));
        $this->assertFalse(is_valid_mobile('08123456789'));

        $this->assertEquals('09123456789', clean_mobile('989123456789'));
        $this->assertEquals('09123456789', clean_mobile('+989123456789'));
        $this->assertEquals('09123456789', clean_mobile('09123456789'));
    }

    public function test_bank_card_luhn_validation(): void
    {
        // Valid Luhn test card (sum = 100)
        $this->assertTrue(is_valid_card_number('6037991199999990'));
        $this->assertFalse(is_valid_card_number('1234567812345678'));
    }

    public function test_money_and_currency_format(): void
    {
        $this->assertEquals('۱۵۰,۰۰۰ تومان', toman(150000));
        $this->assertEquals('150,000 تومان', toman(150000, false));
        $this->assertEquals('۱۵۰,۰۰۰ ریال', rial(150000));
        $this->assertEquals(15000, rial_to_toman(150000));
        $this->assertEquals(150000, toman_to_rial(15000));
    }

    public function test_number_to_words_fa(): void
    {
        $this->assertEquals('صفر', number_to_words_fa(0));
        $this->assertEquals('دوازده', number_to_words_fa(12));
        $this->assertEquals('صد و بیست و پنج', number_to_words_fa(125));
        $this->assertEquals('یک میلیون و دویست و پنجاه هزار', number_to_words_fa(1250000));
    }

    public function test_jalali_date_conversion(): void
    {
        // 2026-03-21 is 1405/01/01
        [$jy, $jm, $jd] = gregorian_to_jalali(2026, 3, 21);
        $this->assertEquals(1405, $jy);
        $this->assertEquals(1, $jm);
        $this->assertEquals(1, $jd);

        [$gy, $gm, $gd] = jalali_to_gregorian(1405, 1, 1);
        $this->assertEquals(2026, $gy);
        $this->assertEquals(3, $gm);
        $this->assertEquals(21, $gd);
    }

    public function test_slugify_fa(): void
    {
        $this->assertEquals('پست-جدید-شماره-12', slugify_fa('پست جدید شماره 12!'));
        $this->assertEquals('hello-world', slugify_fa('Hello World'));
    }
}
