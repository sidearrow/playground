from django.db import models


class Company(models.Model):
    company_id = models.PositiveIntegerField(primary_key=True)
    company_code = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    company_name_kana = models.CharField(max_length=255)
    company_name_orig = models.CharField(max_length=255)
    company_type_id = models.PositiveIntegerField()
    latest_passengers_year = models.PositiveSmallIntegerField(
        blank=True, null=True)
    length = models.DecimalField(
        max_digits=10, decimal_places=1, blank=True, null=True)
    line_num = models.PositiveSmallIntegerField(blank=True, null=True)
    station_num = models.PositiveSmallIntegerField(blank=True, null=True)
    prefecture_id = models.PositiveIntegerField()
    abolition_flg = models.PositiveIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'company'


class CompanyName(models.Model):
    company_id = models.IntegerField()
    company_name = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'company_name'


class CompanyType(models.Model):
    company_type_id = models.PositiveIntegerField(primary_key=True)
    company_type_code = models.CharField(max_length=255)
    company_type_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'company_type'


class Line(models.Model):
    line_id = models.PositiveIntegerField(primary_key=True)
    line_code = models.CharField(unique=True, max_length=50)
    main_line_id = models.PositiveIntegerField(blank=True, null=True)
    company_id = models.PositiveIntegerField()
    line_name = models.CharField(max_length=255)
    line_name_kana = models.CharField(max_length=255)
    line_name_orig = models.CharField(max_length=255)
    status = models.PositiveIntegerField()
    #created_at = models.DateTimeField()
    #updated_at = models.DateTimeField()

    def __str__(self):
        return self.line_name

    class Meta:
        managed = False
        db_table = 'line'


class LineStation(models.Model):
    line_id = models.PositiveIntegerField(primary_key=True)
    branch_line_id = models.PositiveIntegerField(blank=True, null=True)
    sort_no = models.PositiveIntegerField()
    length = models.FloatField(blank=True, null=True)
    length_between = models.FloatField(blank=True, null=True)
    station_id = models.BigIntegerField()
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'line_station'
        unique_together = (('line_id', 'sort_no'),)


class MApiStation(models.Model):
    station_id = models.PositiveIntegerField(primary_key=True)
    id = models.IntegerField()
    station_name = models.CharField(max_length=255)
    station_name_kana = models.CharField(max_length=255, blank=True, null=True)
    line_id = models.PositiveIntegerField()
    prefecture_id = models.PositiveIntegerField()
    address = models.CharField(max_length=255)
    status = models.PositiveIntegerField()
    open_date = models.DateField(blank=True, null=True)
    close_date = models.DateField(blank=True, null=True)
    sort_no = models.PositiveIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    uuid_aggr = models.BigIntegerField(blank=True, null=True)
    uuid = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'm_api_station'


class MPrefecture(models.Model):
    prefecture_id = models.PositiveIntegerField(primary_key=True)
    prefecture_name = models.CharField(max_length=255)
    region_id = models.PositiveIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'm_prefecture'


class Region(models.Model):
    region_id = models.PositiveIntegerField(primary_key=True)
    region_code = models.CharField(max_length=255)
    region_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'region'


class Station(models.Model):
    station_id = models.BigIntegerField(primary_key=True)
    company_id = models.PositiveIntegerField()
    station_name = models.CharField(max_length=255)
    station_name_da = models.CharField(max_length=255, blank=True, null=True)
    station_name_kana = models.CharField(max_length=255, blank=True, null=True)
    station_name_wiki = models.CharField(max_length=255, blank=True, null=True)
    prefecture_id = models.PositiveIntegerField()
    address = models.CharField(max_length=255)
    status = models.PositiveIntegerField()
    open_date = models.DateField(blank=True, null=True)
    close_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'station'


class TPassengers(models.Model):
    station_id = models.BigIntegerField(primary_key=True)
    year = models.PositiveSmallIntegerField()
    num_i = models.PositiveIntegerField(blank=True, null=True)
    num_o = models.PositiveIntegerField(blank=True, null=True)
    num_io = models.PositiveIntegerField(blank=True, null=True)
    reference_title = models.CharField(max_length=255, blank=True, null=True)
    reference_url = models.TextField(blank=True, null=True)
    reference_last_access_date = models.DateField(blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 't_passengers'
        unique_together = (('station_id', 'year'),)
